import nodemailer from 'nodemailer';


let sendMail=(email,subject,msg)=>{

    //send mail.message.
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: 'hamroghar531@gmail.com',
          pass: 'gmdvskjwbphdjkor'
        }
      });
      
      // Set up the email data
      const mailOptions = {
        from: 'hamroghar531@gmail.com',
        to: email,
        subject: subject,
        text: msg
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });   

}

export default sendMail;