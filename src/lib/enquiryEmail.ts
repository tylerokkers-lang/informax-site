import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

export interface EnquiryEmailData {
  name: string;
  company: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  interests?: string[];
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatReceivedAt(date: Date): string {
  const day = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  })
    .format(date)
    .replace(/^24:/, "00:");

  return `${day} · ${time}`;
}

export function buildEnquirySubject(data: EnquiryEmailData): string {
  return `New Informax Enquiry — ${data.company}`;
}

export function buildEnquiryEmailText(data: EnquiryEmailData): string {
  return [
    "NEW ENQUIRY",
    "",
    `Name: ${data.name}`,
    data.jobTitle ? `Job Title: ${data.jobTitle}` : null,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.interests?.length ? `Interested In: ${data.interests.join(", ")}` : null,
    "",
    "Message:",
    data.message,
    "",
    `Received: ${formatReceivedAt(new Date())}`,
    "",
    `Reply directly to this email, or contact ${data.name} at ${data.email}.`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function buildEnquiryEmailHtml(data: EnquiryEmailData): string {
  const name = escapeHtml(data.name);
  const company = escapeHtml(data.company);
  const jobTitle = data.jobTitle ? escapeHtml(data.jobTitle) : null;
  const email = escapeHtml(data.email);
  const phone = data.phone ? escapeHtml(data.phone) : null;
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");
  const receivedAt = formatReceivedAt(new Date());
  const replyHref = `mailto:${email}?subject=${encodeURIComponent(
    `Re: Your enquiry to Informax`
  )}`;

  const interestsHtml = data.interests?.length
    ? `
                <tr>
                  <td style="padding:0 40px 8px 40px;">
                    <p style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#5643e0;">
                      Interested In
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        ${data.interests
                          .map(
                            (interest) => `
                        <td style="padding:0 8px 8px 0;">
                          <span style="display:inline-block;padding:6px 14px;border-radius:999px;background-color:#f0eefd;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:#3c2eb0;white-space:nowrap;">
                            ${escapeHtml(interest)}
                          </span>
                        </td>`
                          )
                          .join("")}
                      </tr>
                    </table>
                  </td>
                </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>New Informax Enquiry</title>
    <!--[if mso]>
    <style type="text/css">
      table { border-collapse: collapse; }
    </style>
    <![endif]-->
  </head>
  <body style="margin:0;padding:0;background-color:#eeeef1;-webkit-text-size-adjust:100%;">
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      New enquiry from ${name} at ${company}. ${escapeHtml(data.message).slice(0, 100)}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eeeef1;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#0a0a10;padding:36px 40px 30px 40px;" align="left">
                <img
                  src="${SITE_URL}/informax-logo-white.png"
                  width="140"
                  height="76"
                  alt="Informax"
                  style="display:block;width:140px;height:76px;border:0;outline:none;margin-bottom:22px;"
                />
                <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#8a7cff;">
                  New Enquiry
                </p>
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:#ffffff;">
                  A new enquiry has been received.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:36px 40px 8px 40px;">
                <p style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#5643e0;">
                  Contact
                </p>
                <p style="margin:0 0 4px 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.3;color:#16161d;">
                  ${name}
                </p>
                ${
                  jobTitle
                    ? `<p style="margin:0 0 2px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#4a4a55;">${jobTitle} &middot; ${company}</p>`
                    : `<p style="margin:0 0 2px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#4a4a55;">${company}</p>`
                }
                <p style="margin:8px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
                  <a href="mailto:${email}" style="color:#3c2eb0;text-decoration:none;font-weight:bold;">${email}</a>
                </p>
                ${
                  phone
                    ? `<p style="margin:4px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#4a4a55;">${phone}</p>`
                    : ""
                }
              </td>
            </tr>

            <tr>
              <td style="padding:20px 40px 0 40px;">
                <div style="border-top:1px solid #e5e5ea;line-height:0;font-size:0;">&nbsp;</div>
              </td>
            </tr>
            ${interestsHtml}

            <tr>
              <td style="padding:24px 40px 8px 40px;">
                <p style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#5643e0;">
                  Enquiry
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f6f8;border-radius:12px;">
                  <tr>
                    <td style="padding:20px 22px;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.7;color:#26262f;">
                      ${message}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 40px 4px 40px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#9a9aa5;">
                  Received
                </p>
                <p style="margin:4px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b6b76;">
                  ${receivedAt}
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 40px 40px 40px;" align="left">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td bgcolor="#5643e0" style="border-radius:999px;">
                      <a
                        href="${replyHref}"
                        style="display:inline-block;padding:14px 30px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px;"
                      >
                        Reply to enquiry
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background-color:#f6f6f8;padding:24px 40px;border-top:1px solid #e5e5ea;" align="left">
                <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#4a4a55;">
                  <strong style="color:#16161d;">Informax</strong> &mdash; Digital guest directories for modern hotels.
                </p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9a9aa5;">
                  <a href="${SITE_URL}" style="color:#9a9aa5;text-decoration:underline;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
                  &nbsp;&middot;&nbsp;
                  <a href="mailto:${CONTACT_EMAIL}" style="color:#9a9aa5;text-decoration:underline;">${CONTACT_EMAIL}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
