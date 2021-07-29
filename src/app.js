const weather = require("./weather");
const express = require("express") 
const path = require('path');  
const { callbackify } = require("util");
const app = express()
const port  = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../views')


app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index', {
        title : 'Weather App',
        name : 'vinod Chaudhary'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send('Hey Please povide address')
    }
    console.log(req.query.address);

    weather.getLatLonOfCity(req.query.address,(error,data)=>{
        if(error){
            return {
                error:error
            }
        }
        weather.getWeatherDetailsOfLatLan(data.latitude,data.longitude,data.place,(error,data)=>{
            if(error){
                return {
                    error:error
                }
            }
            res.send(data)
        })

    })
})

// app.get('',(req,res) => {
//     console.log("i got callled")
//     const Mylocation = weather.getWeatherInfo('Marwar')
//     console.log(Mylocation)
//     //res.render(index.html)
// })

app.listen(port,()=>{
    console.log("Server Started on port : "+port)
})
