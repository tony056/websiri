const firebase = require('firebase')
const Config = require('../config')
var database;
var config = {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: Config.FIREBASE_DOMAIN,
    databaseURL: Config.FIREBASE_DB_URL,
    storageBucket: Config.FIREBASE_STORAGE_BUCKET,
};

function initFirebase(){
    firebase.initializeApp(config);
    database = firebase.database();
}

function queryRestaurantsAtLocation(location, callback){
    database.ref('/cities/' + convertSpecialChar(location)).once('value').then(function(snapshot){
        console.log('query');
        console.log(snapshot.val());
        callback(null, snapshot.val());
    });
}


function convertSpecialChar(location){
    if (location.indexOf('.') > -1){
        var len = location.length;
        return location.slice(0, location.indexOf('.')) + location.slice(location.indexOf('.') + 1 , len);
    }
    return location;
}




module.exports = {
    initFirebase: initFirebase,
    queryRestaurantsAtLocation: queryRestaurantsAtLocation,
};
