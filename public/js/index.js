$(function() {
    let socket = io();
    $("#sendMail").click(function() {
        socket.emit("sendMail", {
            to: $("#to").val(),
            subject: $("#subject").val(),
            text: $("#text").val()
        })
    })    
});