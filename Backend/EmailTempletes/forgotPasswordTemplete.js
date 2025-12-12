function ForgetPasswordTemplete(name, resetLink) {
  return `
  <div style="max-width:600px;margin:auto;background:#f3f4f6;padding:0;font-family:sans-serif;">

    <!-- Header -->
    <div style="background:#0f3b63;padding:32px 20px;text-align:center;border-radius:12px 12px 0 0;">
      <img 
        src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/GE_logo_rfdojk.svg"
        alt="GE Groups" 
        style="width:110px;margin-bottom:12px;"
      />
      <h2 style="color:white;font-size:22px;margin:0;font-weight:600;">
        Commerce3 by GE Group
      </h2>
    </div>

    <!-- White Card -->
    <div style="background:white;padding:32px;border-radius:0 0 12px 12px;">
      
      <h2 style="font-size:22px;font-weight:700;color:#111827;margin:0 0 16px;">
        Reset Your Password
      </h2>

      <p style="font-size:15px;color:#4b5563;margin-top:0;">
        Hello <strong>${name}</strong>,
      </p>

      <p style="font-size:15px;color:#4b5563;line-height:1.6;">
        Click the button below to reset your password:
      </p>

      <!-- Button -->
      <a href="${resetLink}"
        style="display:inline-block;background:#3b82f6;color:white;font-size:16px;font-weight:600;
        padding:12px 22px;border-radius:8px;text-decoration:none;margin:20px 0;cursor:pointer;">
        Reset Password
      </a>

      <p style="font-size:14px;color:#6b7280;margin-top:24px;">
        If the button does not work, use the link below:
      </p>

      <p style="font-size:13px;color:#3b82f6;word-break:break-all;">
        ${resetLink}
      </p>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;">

      <p style="font-size:12px;color:#6b7280;text-align:center;margin:0;">
        © 2025 Commerce3 by GE Group. All rights reserved.
      </p>

    </div>
  </div>
  `;
}

module.exports = ForgetPasswordTemplete;
