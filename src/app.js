const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geolocation = require('./utils/geolocation');


const port = process.env.PORT || 3000;
const app = express();

//paths for views and public folder
const indexdirpath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials');

//Setup handel bars
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

//use static pages
app.use(express.static(indexdirpath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Home page :)',
        name: 'Kajol Singh'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About page',
        name: 'Kajol Singh'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help page',
        name: 'Kajol Singh'
    });
})


//Weather forecast API
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ //return is needed to avoid the error "can not set headers after it's sent to the client"
            error: 'Please provide the address :)'
        })
    }
    geolocation(req.query.address, (error, {latitute, longitude, place} = {})=> { //we are setting the object as an empty array by default to avoid the server crash
        if(error) {
           return res.send({error});
        }
            console.log(latitute, longitude, place);
            // weatherfunc(res);
            forecast(latitute,longitude,(error, response) => {
                if(error) {
                    return res.send({error});
                 }
                res.send(
                    [{
                        forecast: response,
                        place,
                        address: req.query.address
                    }]
                );
            })        
    })
    
})

//To tackle with all the urls under /help
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 ERROR!',
        name: 'Kajol Singh',
        errortext: 'Help article not found :('
    })
})

//To catch all the urls not defined above
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 ERROR!',
        name: 'Kajol Singh',
        errortext: 'Page not found :('
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port);
})