import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.SYSTEM_SERVICE_PROVIDER_EMAIL,
        pass: process.env.SYSTEM_SERVICE_PROVIDER_EMAIL_PASSWORD,
    },
});

// export const setUserResetToken = (userId, token, expirationDate) => {
//     // Update the 'resetPasswordToken' and 'resetPasswordTokenExpiration' fields in the UserModel
//     try {
//         return UserModel.findByIdAndUpdate(userId, {
//             resetPasswordToken: token,
//             resetPasswordTokenExpiration: expirationDate,
//         });
//     } catch (error) {
//         console.log("error at setUserResetToken");
//         console.log(error);
//     }
// };

export const sendPasswordResetEmail = async (
    email,
    resetLink,
    otpExpirationMinutes
) => {
    // Send an email to the user containing the resetLink
    // You can use libraries like 'nodemailer' to send emails

    try {
        const mailOptions = {
            from: "info@readlanka.com",
            to: email,
            subject: "Email Confirmation OTP",
            html: `
          <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
              <div style="text-align: center;">
                <img src="https://mediapantheon.com/wp-content/uploads/2023/05/Media-Pantheon-Inc-Logo-Black.png" alt="Company Logo" style="width: 200px; height: auto;">
              </div>
              <h2 style="color: #333; margin-top: 20px; text-align: center;">Email Confirmation OTP</h2>
              <p style="color: #666; font-size: 16px;">Follow this link to reset your password: <strong>${resetLink}</strong></p>
              <p style="color: #666; font-size: 16px;">The url is valid for ${otpExpirationMinutes} minutes. After that, it will expire.</p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${resetLink}" style="background-color: #4CAF50; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Change Password</a>
              </div>
            </div>
          </div>
        `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.log("Error sending email:", error);
    }
};
