const request = require('request');

const geofunc = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?types=country&access_token=pk.eyJ1Ijoia2Fqb2wtc2luZ2giLCJhIjoiY2syYWw2enMzMDIyMTNjbGs0dncwcW9sOCJ9.W78Htfcrq4Soc4wUQvjmQw'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the geolaction server!');
        }
        else if(body.features.length === 0) {
            callback('No such location found!');
        }
        else{
            callback(undefined, 
                {
                    latitute:body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    place: body.features[0].place_name,
                });
        }
    })
}

module.exports = geofunc;