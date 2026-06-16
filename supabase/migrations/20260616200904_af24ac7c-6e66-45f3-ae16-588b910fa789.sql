
-- Roles enum + table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users view own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create policy "Admins view all roles"
  on public.user_roles for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins manage roles"
  on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Audit logs
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  user_email text,
  action text not null,
  details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

grant select, insert on public.audit_logs to authenticated;
grant all on public.audit_logs to service_role;

alter table public.audit_logs enable row level security;

create policy "Admins view audit logs"
  on public.audit_logs for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Authenticated insert own audit logs"
  on public.audit_logs for insert to authenticated
  with check (auth.uid() = user_id);

-- Extend booking_requests
alter table public.booking_requests add column if not exists status text not null default 'pending';
alter table public.booking_requests add column if not exists admin_notes text;
alter table public.booking_requests add column if not exists updated_at timestamptz not null default now();

-- Extend contact_submissions
alter table public.contact_submissions add column if not exists status text not null default 'new';
alter table public.contact_submissions add column if not exists admin_notes text;
alter table public.contact_submissions add column if not exists updated_at timestamptz not null default now();

-- Replace legacy admin policies on booking_requests
drop policy if exists "Admins can view booking requests" on public.booking_requests;
drop policy if exists "Authenticated users can view booking_requests" on public.booking_requests;

create policy "Admins view booking requests"
  on public.booking_requests for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins update booking requests"
  on public.booking_requests for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins delete booking requests"
  on public.booking_requests for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Replace legacy admin policies on contact_submissions
drop policy if exists "Admins can view contact submissions" on public.contact_submissions;
drop policy if exists "Authenticated users can view contact_submissions" on public.contact_submissions;

create policy "Admins view contact submissions"
  on public.contact_submissions for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins update contact submissions"
  on public.contact_submissions for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins delete contact submissions"
  on public.contact_submissions for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Auto-seed admins on signup for whitelisted emails
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email in ('tadiwachigumadzi3@gmail.com', 'lissachigumadzi789@gmail.com') then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at triggers
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_booking_requests_updated_at on public.booking_requests;
create trigger update_booking_requests_updated_at
  before update on public.booking_requests
  for each row execute function public.update_updated_at_column();

drop trigger if exists update_contact_submissions_updated_at on public.contact_submissions;
create trigger update_contact_submissions_updated_at
  before update on public.contact_submissions
  for each row execute function public.update_updated_at_column();
