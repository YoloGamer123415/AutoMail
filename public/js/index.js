$(function(){
    let socket = io();

    $.get("./json/mail.json", function(annoyingPeople, error){
        $("#sendMail").click(function(){

            function sendMailNow() {
                socket.emit("sendMail", {
                    to: $("#to").val(),
                    subject: $("#subject").val(),
                    text: $("#text").val().split("\n").join("<br />"),
                    timesToLoop: $("#timesToLoop").val()
                })
            }

            function checkMailTo(x){
                var mailTo = $("#to").val();

                if (isNaN(x) || mailTo === "") {
                    console.log("False");
                    sendMailManually();
                } else {
                    console.log("True");
                    sendMailUsingJSON(x);
                }
            }
    
            function sendMailManually(){
                var mailTo = $("#to").val();
                var mailSubject = $("#subject").val();
                var loop = $("#timesToLoop").val();
                var timesSend = 0;
                
                console.log("loop = '" + loop + "'");
                
                if (mailTo === "" || mailTo === "yourMailAdress@something.com" /*you can add as many as you want to*/) {
                    if (mailTo === "") {
                        console.log("The mail could not be send, because there is not specified where to mail to.");
                
                        $("#error").text("The mail could not be send, because there is not specified where to mail to.");
                    } else {
                        console.log("The mail could not be send, because '" + mailTo + "' is a nice guy and doesn't deserve this.");
                
                        $("#error").text("The mail could not be send, because '" + mailTo + "' is a nice guy and doesn't deserve this.");
                    }
                } else {
                    if (mailSubject === "" || loop === "") {
                        if (loop === "") {
                            console.log("The mail could not be send, because there is not specified how many times to mail it.");
                
                            $("#error").text("The mail could not be send, because there is not specified how many times to mail it.");
                        } else {
                            if (mailSubject === "") {
                                console.log("Sending the mail to '" + mailTo + "' " + loop + " time(s).");
                
                                $("#error").text("Sending the mail to '" + mailTo + "'.");
                                sendMailNow();
                            }
                        }
                    } else {
                        console.log("Sending the mail '" + mailSubject + "' to '" + mailTo + "' " + loop + " time(s).");

                        $("#error").text("Sending the mail '" + mailSubject + "' to '" + mailTo + "' " + loop + " time(s).");
                        sendMailNow();
                    }
                }
            }

            function sendMailUsingJSON(y){
                console.log("Sending mails using JSON!");

                $("#error").text("Sending the mail '" + annoyingPeople.peopleToSpam[y].Subject + "' to '" + annoyingPeople.peopleToSpam[y].To + "' " + annoyingPeople.peopleToSpam[y].TimesToSend + " time(s).");
                
                socket.emit("sendMail", {
                    to: annoyingPeople.peopleToSpam[y].To,
                    subject: annoyingPeople.peopleToSpam[y].Subject,
                    text: annoyingPeople.peopleToSpam[y].Text,
                    timesToLoop: annoyingPeople.peopleToSpam[y].TimesToSend
                })
            }
    
            var maybeANumber = $("#to").val();
            checkMailTo(maybeANumber);

            console.log("[ " + error + " ]");
    
        })
    })
})
