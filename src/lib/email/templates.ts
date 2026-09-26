const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Lead = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

export function ownerNotification(lead: Lead) {
  return {
    subject: `New portfolio message from ${lead.name}`,
    html: `<div style="font-family:sans-serif;line-height:1.6">
<h2>New message from ${escape(lead.name)}</h2>
<p><b>Email:</b> ${escape(lead.email)}<br><b>Project:</b> ${escape(lead.projectType)}<br><b>Budget:</b> ${escape(lead.budget)}</p>
<p style="white-space:pre-wrap">${escape(lead.message)}</p>
<p style="color:#666">Reply directly to this email to answer ${escape(lead.name)}.</p>
</div>`,
  };
}

const replies = {
  en: {
    subject: "Thanks for reaching out",
    body: (name: string) =>
      `Hi ${name},<br><br>Thanks for your message — I've received it and will get back to you soon.<br><br>Sahar Mahmoud`,
  },
  ar: {
    subject: "شكرًا على تواصلك",
    body: (name: string) =>
      `أهلًا ${name}،<br><br>شكرًا على رسالتك — وصلتني وهرد عليك في أقرب وقت.<br><br>سحر محمود`,
  },
} as const;

export function visitorAutoReply(name: string, locale: "en" | "ar") {
  const reply = replies[locale];
  return {
    subject: reply.subject,
    html: `<div style="font-family:sans-serif;line-height:1.7;${locale === "ar" ? "direction:rtl;text-align:right" : ""}">${reply.body(escape(name))}</div>`,
  };
}
