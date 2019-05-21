const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaXNhczJnIiwiYSI6ImNqdm1nNWZwOTE4a200Ym1nZ3E0dWN6MDUifQ.S1Aic7MWCfpCMOKK3kE8Cw`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location services!`);
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            });
        }
    });
};


module.exports = geocode;