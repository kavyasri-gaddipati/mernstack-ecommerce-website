const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Transporter Create Cheyadam (Gmail Service)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Mee Email
            pass: process.env.EMAIL_PASS  // Mee App Password (Not regular password)
        }
    });

    // 2. Email Options
    const mailOptions = {
        from: `Pasovit Clothings <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;