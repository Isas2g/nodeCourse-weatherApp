const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

// Main page route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Renat Krasava'
    });
});

// About page route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Renat Krasava'
    });
});

// Help page route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Renat Krasava'
    });
});

// Weather page route
app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, { latitude, longitude, placeName: location } = {}) => {
        if (error) return res.send({ error });

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error });

            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Renat Krasava'
    });
});

// * Means the pages that not stated to be shown.
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Renat Krasava'
    });
});

app.listen(3000, () => console.log('Server running at http://127.0.0.1:3000'));