const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
    },
});

export async function sendMail(to: string, subject: string, text: string) {
    try {
                await transporter.sendMail({
            from: 'Good2Loan <good2loan@gmail.com>',
            to,
            subject,
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                font-size: 14px;
                                color: #333;
                            }
                            h1 {
                                color: blue;
                            }
                            p {
                                margin-bottom: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${subject}</h1>
                        <p>${text}</p>
                    </body>
                </html>
            `,
        });
            } catch (error) {
        console.error('Error sending email:', error);
    }
}
