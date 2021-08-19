var nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
   
  let transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
        clientId: process.env.CLIENT_ID,
        clientSecret:  process.env.CLIENT_SECRET,
        refreshToken: process.env.TOKEN
    }
});

var mailOptions = {
    from: process.env.FROM,
    to: process.env.TO,
    subject: 'TEST MODULE NODEMAIL avec CRON PESK  : Océane API Oauth REUSSSI :D',
    text: `Test push mail avec nodemail tous les 1min, creation clès API`
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        res.json(error);
    } else {
        console.log('Email sent: ' + info.response);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send('test envoie')


    }
});
  
 
});


// Le serveur ecoute sur le port 3022
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`server on port ${app.get("port")}`);
})