const request = require('request');
const weatherfunc = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/0ef5845eb27bcb98daf7ca6182aa4c45/' + lat +','+ lon;
    request({url, json: true}, (error, {body}) => {
        if(error)  {
            callback('error in weather server');
        }
        else if (body.currently.length === 0) {
            callback('No weather report found');
        }
        else {
            callback(undefined , 'It is currently '+ body.currently.temperature +
                                 ' degrees out. ' + ' There is a '+ body.currently.precipProbability + ' chances of rain');
        }
    })
}
module.exports = weatherfunc;