import User from '@/model/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'

export const sendEmail = async ({email, emailType, userId}: any )=>{
    try {
        // generating a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if( emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
            )
        }

        if( emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 1800000}
            )
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER ,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOption = {
        from: 'rahul@gmail.com',
        to: email,
        subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
        html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
    };

        const mailResponse = await transporter.sendMail(mailOption)
        return mailResponse

    } catch (error : any) {
        throw new Error(error.message)
    }
}