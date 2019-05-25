const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/486a82ba57a3decb227e5507262946e5/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to forecast services!`);
        } else if (body.error) {
            callback(body.error);
        } else {
            callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out with ${body.currently.precipProbability * 100}% chance of rain and pressure is ${body.daily.data[0].pressure}. Visibility is ${body.daily.data[0].visibility} metres.`);
        }
    });
};

module.exports = forecast;