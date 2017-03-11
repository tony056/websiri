'use strict'

var Config = require('./config')
var wit = require('./services/wit').getWit()

// LETS SAVE USER SESSIONS
var sessions = {}

var findOrCreateSession = function (fbid) {
  var sessionId

  // DOES USER SESSION ALREADY EXIST?
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // YUP
      sessionId = k
    }
  })

  // No session so we will create one
  if (!sessionId) {
    sessionId = new Date().toISOString()
    sessions[sessionId] = {
      fbid: fbid,
      context: {
        _fbid_: fbid
      }
    }
  }

  return sessionId
}

var read = function (sender, message) {
	if (message === 'hello') {
		// Let's reply back hello
        var sessionId = findOrCreateSession(sender)
		message = 'Hello yourself! I am a chat bot. You can say "show me pics of corgis"'
		// wit.send(sender, message);
        // wit.runActions(sessionId, message, sessions[sessionId].context);
        console.log(message);
	} else {
		// Let's find the user
		var sessionId = findOrCreateSession(sender)
        // wit.message(message, {})
        //     .then(function(data){
        //         var restaurantType = firstEntityValue(data.entities, 'restaurant_types') || null;
        //         if(restaurantType){
        //             //provide possible restaurants
        //         }
        //         var restaurantName = firstEntityValue(data.entities, 'restaurants_names') || null;
        //
        //         // console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
        //     }).catch(console.error());
        wit.runActions(sessionId, message, sessions[sessionId].context);
	}
}

var firstEntityValue = function (entities, entity) {
	var val = entities && entities[entity] &&
		Array.isArray(entities[entity]) &&
		entities[entity].length > 0 &&
		entities[entity][0].value

	if (!val) {
		return null
	}
	return typeof val === 'object' ? val.value : val
}

module.exports = {
	findOrCreateSession: findOrCreateSession,
	read: read,
}
