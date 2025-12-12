function passwordUpdatedTemplate(username) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Updated</title>
  </head>

  <body style="margin:0; padding:0; background:#eef1f6; font-family:Arial, sans-serif;">
      
      <table width="100%" cellspacing="0" cellpadding="0" style="padding: 40px 0;">
          <tr>
              <td>
                  <table width="600" align="center" cellpadding="0" cellspacing="0" 
                         style="background:#ffffff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.08); overflow:hidden;">

                      <!-- Header -->
                      <tr>
                          <td style="background:#0a3d62; padding:20px 0; text-align:center;">

                              <!-- Brighter Logo Background -->
                              <div style="
                                  background:#ffffff; 
                                  padding:12px; 
                                  display:inline-block;
                                  border-radius:12px;
                                  box-shadow:0 4px 10px rgba(0,0,0,0.15);
                              ">
                                  <img src="https://i.ibb.co/YSWfjjd/GE-logo-removebg-preview.png"
                                       alt="GE Logo"
                                       style="width:110px; height:auto;">
                              </div>

                              <h2 style="color:#ffffff; margin-top:15px; font-size:22px; letter-spacing:1px; font-weight:500;">
                                  Commerce3 by GE Group
                              </h2>
                          </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                          <td style="padding:30px 35px;">
                              <h2 style="color:#333; font-size:24px; margin-bottom:10px;">
                                  Hello ${username},
                              </h2>

                              <p style="color:#555; font-size:16px; line-height:1.6;">
                                  This is to inform you that your account password has been 
                                  <strong style="color:#2ecc71;">successfully updated</strong>.
                              </p>

                              <p style="color:#555; font-size:16px; line-height:1.6;">
                                  If this change was made by you, everything is all set ✔️.
                              </p>

                              <p style="color:#e74c3c; font-size:16px; font-weight:bold; line-height:1.6;">
                                  If you did <u>not</u> make this change, please reset your password immediately or contact our support team.
                              </p>

                              <p style="font-size:14px; color:#777; line-height:1.6; margin-top:35px;">
                                  Thank you for being a part of <strong>Commerce3 by GE Group</strong>.<br>
                                  Stay secure,<br>
                                  <strong>Security Team</strong>
                              </p>
                          </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                          <td style="background:#f0f0f0; padding:15px 20px; text-align:center; font-size:13px; color:#555;">
                              © ${new Date().getFullYear()} Commerce3 by GE Group · All Rights Reserved
                          </td>
                      </tr>

                  </table>
              </td>
          </tr>
      </table>

  </body>
  </html>
  `;
}

module.exports = passwordUpdatedTemplate;
