
CREATE TABLE public.email_templates (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  subject text not null,
  html text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_templates TO authenticated;
GRANT ALL ON public.email_templates TO service_role;

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view email templates"
  ON public.email_templates FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert email templates"
  ON public.email_templates FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update email templates"
  ON public.email_templates FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete email templates"
  ON public.email_templates FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.email_templates (key, name, subject, description, html) VALUES
('booking_confirmation',
 'Booking Confirmation',
 'We received your booking request — JM Staffing Solutions',
 'Sent to clients after a booking request is submitted. Variables: {{name}}, {{event_type}}, {{event_date}}, {{guests}}, {{staff_needed}}, {{details}}',
$$<!doctype html>
<html><body style="margin:0;padding:0;background:#f7f5f0;font-family:Arial,Helvetica,sans-serif;color:#1a2238;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e7e3d7;">
        <tr><td style="background:#1a2238;padding:28px;text-align:center;">
          <h1 style="margin:0;color:#d4af37;font-family:Georgia,'Times New Roman',serif;font-weight:normal;letter-spacing:1px;">JM Staffing Solutions</h1>
        </td></tr>
        <tr><td style="padding:32px;">
          <h2 style="margin:0 0 12px;color:#1a2238;font-family:Georgia,serif;font-weight:normal;">Thank you, {{name}}</h2>
          <p style="margin:0 0 16px;line-height:1.6;">We've received your booking request and our team will be in touch within 24 hours to confirm the details.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;border-radius:6px;margin:16px 0;">
            <tr><td style="padding:18px;">
              <p style="margin:0 0 6px;"><strong style="color:#1a2238;">Event:</strong> {{event_type}}</p>
              <p style="margin:0 0 6px;"><strong style="color:#1a2238;">Date:</strong> {{event_date}}</p>
              <p style="margin:0 0 6px;"><strong style="color:#1a2238;">Guests:</strong> {{guests}}</p>
              <p style="margin:0 0 6px;"><strong style="color:#1a2238;">Staff needed:</strong> {{staff_needed}}</p>
              <p style="margin:0;"><strong style="color:#1a2238;">Details:</strong> {{details}}</p>
            </td></tr>
          </table>
          <p style="margin:16px 0 0;line-height:1.6;">Warm regards,<br/><span style="color:#d4af37;font-weight:bold;">The JM Staffing Team</span></p>
        </td></tr>
        <tr><td style="background:#1a2238;padding:16px;text-align:center;color:#f7f5f0;font-size:12px;">
          JM Staffing Solutions (Pty) Ltd · Elite Event Staffing
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>$$),
('contact_received',
 'Contact Message Received',
 'We received your message — JM Staffing Solutions',
 'Sent to people who submit the contact form. Variables: {{name}}, {{subject}}, {{message}}',
$$<!doctype html>
<html><body style="margin:0;padding:0;background:#f7f5f0;font-family:Arial,Helvetica,sans-serif;color:#1a2238;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e7e3d7;">
        <tr><td style="background:#1a2238;padding:28px;text-align:center;">
          <h1 style="margin:0;color:#d4af37;font-family:Georgia,'Times New Roman',serif;font-weight:normal;letter-spacing:1px;">JM Staffing Solutions</h1>
        </td></tr>
        <tr><td style="padding:32px;">
          <h2 style="margin:0 0 12px;color:#1a2238;font-family:Georgia,serif;font-weight:normal;">Hi {{name}},</h2>
          <p style="margin:0 0 16px;line-height:1.6;">Thanks for reaching out. We've received your message and will reply as soon as possible.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;border-radius:6px;margin:16px 0;">
            <tr><td style="padding:18px;">
              <p style="margin:0 0 8px;"><strong style="color:#1a2238;">Subject:</strong> {{subject}}</p>
              <p style="margin:0;white-space:pre-wrap;">{{message}}</p>
            </td></tr>
          </table>
          <p style="margin:16px 0 0;line-height:1.6;">Warm regards,<br/><span style="color:#d4af37;font-weight:bold;">The JM Staffing Team</span></p>
        </td></tr>
        <tr><td style="background:#1a2238;padding:16px;text-align:center;color:#f7f5f0;font-size:12px;">
          JM Staffing Solutions (Pty) Ltd · Elite Event Staffing
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>$$);
