const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const nodemailer = require("nodemailer");

app.use(express.static("./website"));

io.on("connection", function(socket) {
  console.log("Client connected!");

  socket.on("disconnect", function() {
    console.log("Client disconnected!");
  })

  socket.on("sendMail", sendMail); //of function(){sendMail} maar dit is cleaner
});

http.listen(80, function () {
  console.log("listening on *:80");
});

function sendMail(data) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "automatic.bot.001@gmail.com",
      pass: ""
    }
  });

  const to = data.to
  const subject = data.subject
  const text = data.text
  const timesToSend = data.timesToLoop

  var timesSend = 0;

  const mailOptions = {
    from: "automatic.bot.001@gmail.com",
    to: to,
    subject: subject,
    html: "<style> .lowerText {color: rgb(0, 0, 0);} .website {color: rgb(0, 0, 0); text-decoration: none;} </style> <div class='mail'> <div class='text'>" + text + "</div> <br /><br /> <center> <h6 class='lowerText'>This mail has been sent automatically. Replaying to this mail doesn't work.</h6> <h6> <a class='website' href='https://molmassa.000webhostapp.com'>Our website</a> </h6> </center> </div>"
  };

  var timer = setInterval(function(){
    if(timesSend < timesToSend){
      timesSend++;

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email '" + subject + "' has been sent " + timesLooped + " time(s) to '" + to + "': " + info.response);
        }
      });
    } else {
      clearInterval(timer);
      console.log("All mails have been send.")
    }
  }, 2000)

}
