var nodemailer = require('nodemailer');
var nodeoutlook = require('nodejs-nodemailer-outlook');
const express = require('express');
const app = express();



app.get('/gmail', function (req, res) {
   
  let transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: "****", // generated ethereal user
        pass: "****", // generated ethereal password
        clientId: "*****",
        clientSecret:  "****",
        refreshToken: "*****"
    }
});

var mailOptions = {
    from: "myemail@gmail.com",
    to: "myemail@gmail.com",
    subject: 'TEST MODULE NODEMAIL',
    text: `Test push mail avec nodemail`
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        res.json(error);
    } else {
        console.log('Email sent: ' + info.response);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send("Email envoyé")


    }
});
  
 
});

app.get('/outlook', function (req, res) {

nodeoutlook.sendEmail({

    auth: {
        user: "myemail@outlook.com",
        pass: "***"
    },
    from: "myemail@outlook.com",
    to: '****',
    subject: '****',
    html: '<b>This is bold text</b>',
    text: 'This is text version!',
    replyTo: "",

    
    onError: (e) => console.log(e),
    onSuccess: (i) =>  res.send("Email envoyé")

   
}


);
})

// Le serveur ecoute sur le port 3022
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`server on port ${app.get("port")}`);
})