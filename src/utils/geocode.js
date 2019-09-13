const request = require('request');

const geocode = (address,callback)=>{
    const geocodeUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoiYXZpbmFzaDk2IiwiYSI6ImNqenF5ejlibjEybWwzbnIyYTRkb3dzemoifQ.L9xV9HmFJPaw8PYNpBrU6w'
    
    request({url:geocodeUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services!',undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find the location try another search',undefined)
        }else{
            callback(undefined,{
               longitude:response.body.features[0].center[0],
              latitude:response.body.features[0].center[1],
              location:response.body.features[0].place_name,
              
                
            })
        }
    })
}

module.exports = geocode