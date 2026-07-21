"""Branded HTML emails for booking confirmations."""
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

MONTHS_RO = [
    "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
    "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
]

ADDRESS = "Șoseaua Alexandriei nr. 9, bloc 4, scara H, parter, apt. 71, București"
PHONE = "0722 614 766"


def _fmt_date(d):
    return f"{d.day} {MONTHS_RO[d.month - 1]} {d.year}"


def _fmt_time(t):
    return t.strftime("%H:%M")


def _layout(title, intro, rows, outro=""):
    """Shared purple/yellow email shell. Inline styles + tables (email-client safe)."""
    detail_rows = "".join(
        f"""
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #ece7f7;color:#6b6480;
                     font-size:14px;white-space:nowrap;padding-right:24px;">{label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #ece7f7;color:#231038;
                     font-size:14px;font-weight:bold;text-align:right;">{value}</td>
        </tr>"""
        for label, value in rows
    )
    outro_html = (
        f'<p style="margin:24px 0 0;color:#6b6480;font-size:14px;line-height:1.6;">{outro}</p>'
        if outro
        else ""
    )
    return f"""\
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f2f0f7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="background-color:#f2f0f7;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- header -->
        <tr><td align="center" style="padding-bottom:24px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#facc15;border-radius:12px;width:44px;height:44px;
                       text-align:center;vertical-align:middle;font-size:22px;">📊</td>
            <td style="padding-left:12px;text-align:left;">
              <div style="font-family:Georgia,serif;font-size:18px;font-weight:bold;color:#231038;">Gebaila Livia</div>
              <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#6d28d9;">CONSULTANT FISCAL</div>
            </td>
          </tr></table>
        </td></tr>

        <!-- card -->
        <tr><td style="background-color:#ffffff;border:1px solid #e5e0f0;border-radius:16px;padding:32px;font-family:Arial,sans-serif;">
          <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;color:#231038;">{title}</h1>
          <p style="margin:0 0 24px;color:#4b4359;font-size:15px;line-height:1.6;">{intro}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                 style="background-color:#faf8ff;border:1px solid #ece7f7;border-radius:12px;padding:8px 20px;">
            {detail_rows}
          </table>
          {outro_html}
        </td></tr>

        <!-- footer -->
        <tr><td align="center" style="padding-top:24px;font-family:Arial,sans-serif;font-size:12px;color:#8a8499;line-height:1.7;">
          Consultant Fiscal Gebaila Livia · {PHONE}<br>
          {ADDRESS}
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""


def _send(subject, text_body, html_body, to):
    msg = EmailMultiAlternatives(subject, text_body, settings.DEFAULT_FROM_EMAIL, to)
    msg.attach_alternative(html_body, "text/html")
    msg.send(fail_silently=False)


def send_booking_emails(booking):
    """Send the confirmation to the client and the notification to the office."""
    firma_dest = booking.firma_destinatie or "Consultant Fiscal - Gebaila Livia"
    date_s, time_s = _fmt_date(booking.data), _fmt_time(booking.ora)

    rows = [
        ("Programare la", firma_dest),
        ("Data", date_s),
        ("Ora", time_s),
        ("Adresa", ADDRESS),
    ]
    client_html = _layout(
        "Întâlnirea este confirmată ✔",
        f"Bună ziua, {booking.nume}! Vă mulțumim pentru programare. "
        f"Am înregistrat cererea dumneavoastră și vă așteptăm cu drag la birou.",
        rows,
        f"Dacă doriți să modificați sau să anulați întâlnirea, ne puteți contacta la {PHONE}.",
    )
    client_text = (
        f"Bună ziua, {booking.nume}!\n\n"
        f"Vă mulțumim pentru programarea întâlnirii la {firma_dest}.\n"
        f"Data: {date_s}, ora {time_s}\nAdresa: {ADDRESS}\n\n"
        f"Vă așteptăm cu drag!\nConsultant Fiscal Gebaila Livia · {PHONE}"
    )
    _send("Întâlnire confirmată — Consultant Fiscal Gebaila Livia", client_text, client_html, [booking.email])

    host_rows = [
        ("Pentru", firma_dest),
        ("Client", booking.nume),
        ("Firma", booking.firma),
        ("Data", date_s),
        ("Ora", time_s),
        ("Email", booking.email),
        ("Telefon", booking.telefon),
    ]
    if booking.mesaj:
        host_rows.append(("Mesaj", booking.mesaj))
    host_html = _layout(
        "Întâlnire nouă 📅",
        f"O nouă întâlnire a fost programată prin site de {booking.nume} ({booking.firma}).",
        host_rows,
    )
    host_text = (
        f"Întâlnire nouă programată de {booking.nume} ({booking.firma}) pentru {firma_dest} "
        f"pe {date_s} la ora {time_s}.\nEmail: {booking.email} · Telefon: {booking.telefon}\n"
        f"Mesaj: {booking.mesaj or '-'}"
    )
    _send("Întâlnire nouă — programare prin site", host_text, host_html, [settings.EMAIL_HOST_USER])
