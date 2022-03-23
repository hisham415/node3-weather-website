const request = require('request')

const forecast = ( latitude , longtitude , callback) =>{
    const forecastURL = "http://api.weatherstack.com/current?access_key=7c31558ce5688d2d6181fc3b9b39501c&query=" + latitude + "," + longtitude 
    request({ url: forecastURL , json:true } , ( error , { body } ) => {
        if(error){
            callback('cant connect to weather services!' , undefined)
        }
        else if( body.error ){
            callback('cant find location', undefined )
        }else{
            callback(undefined , "Temperature: " + body.current.temperature + ", " + "FeelsLike: " + body.current.feelslike)
        }
    })

}

module.exports = forecast