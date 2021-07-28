const request = require('request')

const getWeatherInfo = (city) =>{
    getLatLonOfCity(city,(error,response)=>{
        if(error){
            console.log(error)
        } 
        else{
            const lat = response.latitude;
            const lon = response.longitude;
            const place = response.place;
            getWeatherDetailsOfLatLan(lat,lon,place,(error, data)=>{
                if(error){
                    return error
                }
                else{
                    return data;
                }
            })
        }       
    })
}


const getLatLonOfCity = (city,callback) =>{
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token=pk.eyJ1IjoiaGVsbG8xMjEyIiwiYSI6ImNrcmk1Yzd1bDBjbTIydXJ2NnFtbDE4a3gifQ.gB_bXlibqIu3TYsBGSTghA&limit=1';
    request({url : URL , json : true },(error,response)=>{
        if(error){
            return callback('Unable to connect with location service.',undefined);
        }else if(response.body.features.length == 0){
            return callback('Unable to find '+city+' in world map.',undefined);
        }
        else{
            const lat = response.body.features[0].center[1];
            const lon = response.body.features[0].center[0];
            const place = response.body.features[0].place_name;
            
            data = {
                latitude : lat,
                longitude : lon,
                place : place
            }

            return callback(undefined,data);
        }

    })

}

const getWeatherDetailsOfLatLan = (latitude,longitude,place, callback) => {  
    const URL = 'http://api.weatherstack.com/current?access_key=61ec6dbbdb11602e1e2bb90e856f8b27&query='+latitude+','+longitude+'&units%20=%20m&language%20=%20hi';
    request({url : URL , json : true },(error,response)=>{
        if(error){
            return callback('Unable to connect with location service.',undefined);
        }
        else{
            const temperature = response.body.current.temperature;
            const weather_descriptions = response.body.current.weather_descriptions;
            data = {
                place : place,
                temperature : temperature,
                weather_descriptions : weather_descriptions
            }

            return callback(undefined,data);
        }
    })

}



module.exports = {
    getWeatherInfo,
    getLatLonOfCity,
    getWeatherDetailsOfLatLan
}