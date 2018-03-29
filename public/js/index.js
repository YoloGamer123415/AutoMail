$(function() {
    let socket = io();

    $("#sendMail").click(function(){
        var mailTo = $("#to").val();
        var mailSubject = $("#subject").val();
        var loop = $("#timesToLoop").val();
        var timesSend = 0;

        function sendMail() {
            socket.emit("sendMail", {
                to: $("#to").val(),
                subject: $("#subject").val(),
                text: $("#text").val().split("\n").join("<br />"),
                timesToLoop: $("#timesToLoop").val()
            })
        }

        console.log("loop = '" + loop + "'");

        if(mailTo === "" || mailTo === "myAdress@something.com"){
            if (mailTo === "") {
                console.log("The mail could not be send, because there is not specified where to mail to.");

                $("#error").text("The mail could not be send, because there is not specified where to mail to.");
            } else {
                console.log("The mail could not be send, because 'myAdress@something.com' is a nice guy and doesn't deserve this.");

                $("#error").text("The mail could not be send, because 'myAdress@something.com' is a nice guy and doesn't deserve this.");
            }
        }else{
            if (mailSubject === "") {
                console.log("The mail has been send to '" + mailTo + "'.");

                $("#error").text("The mail has been send to '" + mailTo + "'.");
            } else {
                console.log("Sending the mail '" + mailSubject + "' to '" + mailTo + "' " + loop + " time(s).");

                $("#error").text("Sending the mail '" + mailSubject + "' to '" + mailTo + "' " + loop + " time(s).");
            }

            if (loop === "") {
                console.log("The mail could not be send, because there is not specified how many times to mail it.");

                $("#error").text("The mail could not be send, because there is not specified how many times to mail it.");
            } else {
                sendMail();
            }
        }
    })
});
