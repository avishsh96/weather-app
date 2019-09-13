const path = require('path');
const express = require('express');
const app = express();
const Port = process.env.PORT || 3000;
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define paths for express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'/templates/views');
const partialsPath  = path.join(__dirname, '/templates/partials')

//Setup handlebar engines and view engine
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Avinash'
    });
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:"About me",
        name:"avinash"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:"This is some helpful text",
        title:'Help',
        name:'Avinash',
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     address:req.query.address
    // })
})
app.get('/help/*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Avinash',
    errorMessage:'Help page not found'
})
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Avinash',
        errorMessage:'Page not found'
    })
})

app.listen(Port, ()=>{
    console.log(`Server is UP!! on Port ${Port}.`)
})