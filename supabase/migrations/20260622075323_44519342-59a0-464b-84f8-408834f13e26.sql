
-- Auto-grant admin role to every new signup, and backfill existing users.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_roles (user_id, role)
  values (new.id, 'admin')
  on conflict do nothing;
  return new;
end;
$$;

-- Ensure trigger exists on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill admin role for any existing users
insert into public.user_roles (user_id, role)
select id, 'admin'::public.app_role from auth.users
on conflict do nothing;
