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

        res.sendStatus(200);
    }
});

function receivedMessage(event){
    console.log('Message data: ' + event.message);
}

//sign up the server
app.listen(app.get('port'), function(){
    console.log('running on port', app.get('port'))
});
