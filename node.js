var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "automatic.bot.001@gmail.com",
        pass: "KrijgJeNiet"
    }
});

var to = "joram03@icloud.com"
var subject = "TEST"
var text = "<p>HELLO</p>"

var mailOptions = {
    from: "automatic.bot.001@gmail.com",
    to: to,
    subject: subject,
    html: text + "<br /><center><h6>This mail has been sent automatically. Replaying to this mail doesn't work.</h6><a href='https://molmassa.000webhostapp.com'>Our website</a></center>"
};


transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
    console.log("Email send: " + info.response);
    }
});
