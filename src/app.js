const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env || 3000
//define path for express
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars
app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicPath))

app.get('' , (req , res) =>{
    res.render('index' , {
        title: 'weather app' , 
        name: 'kirito'
    })

})

app.get('/about' , (req , res ) => {

    res.render('about' , {
        title: 'about me ' , 
        name: 'kirito S+'
    })  
})

app.get('/help' , (req , res) =>{
    res.render('help' , {
        title: 'Help' , 
        help: 'this is the help page',
        name: 'kirito'
    })
})

app.get('/weather', ( req , res )=>{
    if(!req.query.address){
        return res.send('error message')
    }
    geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longtitude,(error, data)=>{
            if(error){
                return res.send({error})
            }
            
                
                res.send({
                    location, 
                    forecast: data,
                    address: req.query.address
                })
            
        
        })
    })

  /*  res.send({
        forecast: 'it is cloudy',
        location: 'egypt',
        address: req.query.address
    }) */
})   

app.listen(port , () =>{
    console.log('server is up on port 3000.')
})