
const forms = document.querySelector('form')
const searchElement = document.querySelector('input')

forms.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = searchElement.value;
    const url ='http://localhost:3000/weather?address='+address 
    fetch(url)
    .then((res)=>{
        if(res.error){
            console.log(res.error)
            document.getElementById('WeatherInfoId').innerHTML = res.error
        }else{
           res.json().then((data)=>{
            document.getElementById('WeatherInfoId').innerHTML = JSON.stringify(data)
        })
    }
    })
     
})