'use strict'

const express = require('express')
const bodyParser = require('body-parse')
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
app.get('/webhook', function(req, res){
    if(req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me'){
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

//sign up the server
app.listen(app.get('port'), function(){
    console.log('running on port', app.get('port'))
})
