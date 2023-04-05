const nodemailer = require('nodemailer');

exports.kirimEmail = dataEmail => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'serendiapity@gmail.com', 
          pass: 'qszjegopoigpxhrz', 
        },
      });
      return (
        transporter.sendMail(dataEmail)
        .then(info => console.log(`Email Terkirim: ${info.message}`))
        .catch(err => console.log(`Terjadi Kesalahan: ${err}`))
      )
}