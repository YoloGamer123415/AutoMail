$(function(){
    let socket = io();

    $.get("./mail.json", function(annoyingPeople, error){
        $("#sendMail").click(function(){

            function sendMailNow() {
                socket.emit("sendMail", {
                    to: $("#to").val(),
                    subject: $("#subject").val(),
                    text: $("#text").val().split("\n").join("<br />"),
                    timesToLoop: $("#timesToLoop").val()
                })
            }

            function lookForNaN(x){
                if (isNaN(x)) {
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
                
                if(mailTo === "" || mailTo === "joram03@icloud.com"){
                    if (mailTo === "") {
                        console.log("The mail could not be send, because there is not specified where to mail to.");
                
                        $("#error").text("The mail could not be send, because there is not specified where to mail to.");
                    } else {
                        console.log("The mail could not be send, because 'joram03@icloud.com' is a nice guy and doesn't deserve this.");
                
                        $("#error").text("The mail could not be send, because 'joram03@icloud.com' is a nice guy and doesn't deserve this.");
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
                        sendMailNow();
                    }
                }
            }

            function sendMailUsingJSON(y){
                console.log("Sending mails using JSON!");
                
                socket.emit("sendMail", {
                    to: annoyingPeople.peopleToSpam[y].To,
                    subject: annoyingPeople.peopleToSpam[y].Subject,
                    text: annoyingPeople.peopleToSpam[y].Text,
                    timesToLoop: annoyingPeople.peopleToSpam[y].TimesToSend
                })
            }
    
            var maybeANumber = $("#to").val();
            lookForNaN(maybeANumber);
    
        })
    })
})
