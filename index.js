'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const PORT_NUMBER = 5566

app.set('port', (process.env.PORT || PORT_NUMBER))

app.use(bodyParser.json())


// index route
app.get('/', function(req, res){
    res.send('hello world')
});

//for facebook verification
app.get('/webhook/', function(req, res){
    if(req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me'){
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});

//receive message
app.post('/webhook', function(req, res){
    var data = req.body;
    if(data.object === 'page'){
        data.entry.forEach(function(entry){
            var pageID = entry.id;
            var timeOfEvent = entry.time;

            entry.messaging.forEach(function(event){
                if(event.message){
                    receivedMessage(event);
                } else {
                    console.log('unknown event');
                }
            });
        });

        // res.sendStatus(200);
    }
});

function receivedMessage(event){
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if(messageText){
        switch(messageText) {
            case 'generic':
                sendGenericMessage(senderID);
                break;
            default:
                sendTextMessage(senderID, messageText);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
}

function sendGenericMessage(recipientID, messageText){

}

function sendTextMessage(recipientId, messageText){
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };
    callSendAPI(messageData);
}

function callSendAPI(messageData){
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: 'EAATddErshOMBAKLaVAzPNVMjY4dVZAvNiGUTZAa2ZAflABUVh0yyEeER7motqD94UzTbDTxI47PnUes4ZAnXvb1PZACiHFV4DcI6FiOXsnh7e5gs4DpSCDZAm4qCTqwZCwwOsTZBJATlVhp5zuEv62ETyUjRjFZArAVwHLyxOBBZAQkAZDZD'},
        method: 'POST',
        json: messageData
    }, function(error, response, body){
        if(!error && response.statusCode === 200){
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
            messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    }

    );
}
//sign up the server
app.listen(app.get('port'), function(){
    console.log('running on port', app.get('port'))
});
