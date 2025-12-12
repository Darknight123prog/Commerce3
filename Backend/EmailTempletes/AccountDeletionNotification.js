function UserAccountDeletedTemplate(userName) {
  return `
  <div style="max-width:600px;margin:auto;background:#f3f4f6;padding:20px;font-family:sans-serif;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:20px;">
      <img src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/GE_logo_rfdojk.svg"
           alt="GE Logo"
           style="width:110px; height:auto;">
      <h3 style="margin-top:8px;font-size:18px;color:#1f2937;font-weight:600;">
        Commerce3 by GE Group
      </h3>
    </div>

    <!-- Header -->
    <div style="background:#b91c1c;padding:28px 20px;text-align:center;border-radius:12px 12px 0 0;">
      <h2 style="color:white;margin:0;font-size:22px;">
        Account Deletion Notice
      </h2>
    </div>

    <!-- Body -->
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

      <p style="font-size:16px;color:#111827;margin-top:0;">
        Hi <strong>${userName}</strong>,
      </p>

      <p style="font-size:15px;color:#4b5563;line-height:1.6;">
        We want to inform you that your account has been deleted by an administrator as part of our system actions.
      </p>

      <div style="background:#fef2f2;padding:16px;border-radius:8px;border:1px solid #fecaca;margin:20px 0;">
        <p style="margin:6px 0;font-size:14px;color:#7f1d1d;">
          Your account is no longer active in our system.
        </p>
      </div>

      <p style="font-size:15px;color:#4b5563;line-height:1.6;">
        If you think this was a mistake or you want more information, please contact our support team.
      </p>

      <a href="#"
         style="display:inline-block;margin-top:20px;background:#1d4ed8;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px;">
        Contact Support
      </a>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;">

      <p style="font-size:13px;color:#6b7280;text-align:center;">
        © 2025 Commerce3 by GE Group • Account Security Team
      </p>
    </div>
  </div>
  `;
}

module.exports = UserAccountDeletedTemplate;
