/* 
  Dit bestand moet je natuurlijk niet publiek beschikbaar maken want dan weet iedereen je ww lol
*/

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const nodemailer = require("nodemailer");

app.use(express.static("./public"));

io.on("connection", function(socket) {
  console.log("Client connected!");

  socket.on("disconnect", function() {
    console.log("Client disconnected!");
  })

  socket.on("sendMail", sendMail); //of function(){sendMail} maar dit is cleaner
});

http.listen(8080, function () {
  console.log("listening on *:8080");
});

function sendMail(data) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "automatic.bot.001@gmail.com",
      pass: "KrijgJeNiet"
    }
  });

  const to = data.to
  const subject = data.subject
  const text = data.text

  const mailOptions = {
    from: "automatic.bot.001@gmail.com",
    to: to,
    subject: subject,
    html: text + `<br /><center><h6>This mail has been sent automatically. Replaying to this mail doesn't work.</h6> <a href='https://molmassa.000webhostapp.com'>Our website</a></center>`
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

