const nodemailer = require('nodemailer')

const sendEmail = (email) => {
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
        html: "<p>Sending some HTML to test.</p>"
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