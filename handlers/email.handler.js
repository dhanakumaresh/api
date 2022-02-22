const nodemailer = require('nodemailer');
const url = 'http://localhost:3001';

const sendEmail = (email,project_id,invoice_id) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
        user: 'learnandfuntogether@gmail.com',
        pass: 'learn&1234'
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        }
    });
    
    const mailOptions = {
        from: 'learnandfuntogether@gmail.com',
        to: email,
        subject: 'My first Email!!!',
        html: `<p>${url}/${project_id}/${invoice_id}</p>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = { sendEmail }