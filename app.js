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
         host: "https://nodemail-test.herokuapp.com/",
          port: 3000,
        //  secure: false, // true for 465, false for other ports
        service:'gmail',
          auth: {
            user: process.env.USER,
            pass: process.env.PASS
            },
          tls:{
            rejectUnauthorized:false
          }
        });
        
        var mailOptions = {
          from:  process.env.FROM,
          to:  process.env.TO,
          subject: 'Sending Email using Node.js',
          text: `Hi Smartherd, thank you for your nice Node.js tutorials.
                  I will donate 50$ for this course. Please send me payment options.`
          // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.send("message envoyer")
  
          }
        });
   
  
 
});


// Le serveur ecoute sur le port 3022
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`server on port ${app.get("port")}`);
})