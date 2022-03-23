const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiaGlzaGFtc2F5ZWQyMiIsImEiOiJjbDB3ajE2aHMxYWlpM2Nqd3F3MHowemhyIn0.fPjBb9uIL4BS5qybxrZ5FQ&limit=1"
    request({ url: geocodeURL , json:true } , ( error , {body} = {} ) =>{
        if(error){
            callback('unable to connect to location services',undefined)
        }
        else if( body.features.length === 0 ){
            callback( 'unable to find location services' , undefined )
        } else{
            callback( undefined , {
                latitude: body.features[0].center[0] , 
                longtitude: body.features[0].center[1] , 
                location: body.features[0].place_name
            })
        }
    })
 }

 module.exports = geocode