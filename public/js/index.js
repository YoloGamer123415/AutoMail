$(function() {
    let socket = io();
    $("#sendMail").click(function() {
        console.log("CLicked!")
        
        socket.emit("sendMail", {
            to: $("#to").val(),
            subject: $("#subject").val(),
            text: $("#text").val()
        })
    })    
});
