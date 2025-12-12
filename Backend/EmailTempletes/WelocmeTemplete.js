function Commerce3WelcomeEmail(userName) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Commerce3</title>

      <style>
          body {
              margin: 0;
              padding: 0;
              background: #eef1f6;
              font-family: Arial, sans-serif;
          }
          .container {
              width: 100%;
              padding: 40px 0;
          }
          .email-wrapper {
              max-width: 600px;
              background: #ffffff;
              margin: auto;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 6px 20px rgba(0,0,0,0.10);
          }
          /* Header */
          .header {
              background: #0a3d62;
              padding: 28px 0;
              text-align: center;
              color: #ffffff;
          }

          /* Logo container matching the uploaded screenshot */
          .logo-box {
              background: #ffffff;
              padding: 14px;
              border-radius: 12px;
              display: inline-block;
              box-shadow: 0 3px 10px rgba(0,0,0,0.15);
              margin-bottom: 12px;
          }
          .logo-box img {
              width: 120px;
              height: auto;
              display: block;
          }

          .header-title {
              font-size: 22px;
              margin-top: 10px;
              font-weight: 500;
          }

          /* Main Content */
          .main-content {
              padding: 35px 40px;
          }
          .main-content p {
              font-size: 16px;
              color: #555;
              line-height: 1.6;
              margin: 15px 0;
          }
          .greeting {
              font-size: 22px;
              color: #333;
              font-weight: 600;
              margin-bottom: 15px;
          }

          .highlight-box {
              background: #f8fafc;
              padding: 14px;
              border-radius: 10px;
              text-align: center;
              font-size: 16px;
              color: #333;
              margin: 25px 0;
              border: 1px solid #e1e5eb;
          }

          /* Why Section */
          .why-section {
              background: #f4f6f8;
              padding: 28px 40px;
          }
          .why-section h3 {
              font-size: 18px;
              margin-bottom: 12px;
              color: #111;
          }
          .why-section ul {
              padding-left: 20px;
              font-size: 15px;
              color: #444;
              line-height: 1.6;
              margin: 0;
          }

          /* Footer */
          .footer {
              background: #0a3d62;
              padding: 20px;
              color: #ffffff;
              text-align: center;
              font-size: 13px;
          }
          .footer p {
              margin: 6px 0;
              opacity: 0.9;
          }
      </style>

  </head>

  <body>

      <table class="container" cellpadding="0" cellspacing="0">
          <tr>
              <td align="center">

                  <table class="email-wrapper" cellpadding="0" cellspacing="0">

                      <!-- Header -->
                      <tr>
                          <td class="header">
                              <div class="logo-box">
                                  <img src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/GE_logo_rfdojk.svg" alt="GE Group Logo">
                              </div>
                              <div class="header-title">Commerce3 by GE Group</div>
                          </td>
                      </tr>

                      <!-- Main Content -->
                      <tr>
                          <td class="main-content">
                              <p class="greeting">Hello ${userName},</p>

                              <p>Welcome to <strong>Commerce3</strong>! We're excited to have you join our growing online marketplace.</p>

                              <p>From electronics to daily essentials, we bring you unbeatable offers and a seamless shopping experience.</p>

                              <div class="highlight-box">
                                  🎉 <strong>Your account has been successfully created!</strong>
                              </div>

                              <p>Feel free to explore products, discover deals, and enjoy a personalized shopping journey on Commerce3.</p>
                          </td>
                      </tr>

                      <!-- Why Commerce3 -->
                      <tr>
                          <td class="why-section">
                              <h3>Why Choose Commerce3?</h3>
                              <ul>
                                  <li>🚚 Fast & dependable delivery</li>
                                  <li>💰 Best prices and exclusive offers</li>
                                  <li>⭐ 24/7 customer support</li>
                                  <li>🔒 Secure payments and easy returns</li>
                              </ul>
                          </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                          <td class="footer">
                              <p>Thank you for choosing <strong>Commerce3</strong>!</p>
                              <p>© ${new Date().getFullYear()} Commerce3 by GE Group. All rights reserved.</p>
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

module.exports = Commerce3WelcomeEmail;
