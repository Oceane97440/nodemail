const express = require('express');
var nodemailer = require('nodemailer');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var nodeoutlook = require('nodejs-nodemailer-outlook');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());


app.post('/mail', async function (req, res) {

    try {
        console.log(req.body)
        const email = await req.body.email
        const objet = await req.body.objet
        const messages = await req.body.message


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.TOKEN
            }
        });


        var mailOptions = {
            from: process.env.USER,
            to: email,
            subject: objet,
            text: messages
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);


                return res.json({
                    success: false
                })

            } else {
                console.log('Email sent: ' + info.response);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                console.log("Email envoyé")


                return res.json({
                    success: true
                })


            }
        });


    } catch (error) {
        return res.json({
            success: false
        })
    }

});


app.get('/gmail', function (req, res) {
    res.send("ok")
    /*let transporter = nodemailer.createTransport({

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
  */

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
            onSuccess: (i) => res.send("Email envoyé")


        }


    );
})

// Le serveur ecoute sur le port 3022
app.set("port", process.env.PORT || 3002);

app.listen(app.get("port"), () => {
    console.log(`server on port ${app.get("port")}`);
})