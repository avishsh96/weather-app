const request=require('request');

const forecast = (lat,lang,callback)=>{
    const url = 'https://api.darksky.net/forecast/78748397505985c721309311f5efb01f/'+lat+','+lang+'?units=si';
    request({url:url,json:true},(error,response)=>{
        if(error){
        callback("Can not connect to weather services",undefined)
        }else if(response.body.error){
        callback('Unable to find location',undefined)
        }else{
            callback(undefined,response.body.daily.data[0].summary+' It is currently '+ response.body.currently.temperature +' degress out. There is a '+ response.body.currently.precipProbability+'% chances of rain.')
        
            
                }
    
    })
    }
    module.exports=forecast;