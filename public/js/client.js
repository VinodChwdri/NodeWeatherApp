
const forms = document.querySelector('form')
const searchElement = document.querySelector('input')
const message = document.querySelector('#WeatherInfoId');


forms.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = searchElement.value;
    const url ='/weather?address='+address;
    message.textContent = "Loading...";
    fetch(url)
    .then((res)=>{
        if(res.error){
            console.log(res.error)
            message.textContent = res.error
        }else{
           res.json().then((data)=>{
            message.textContent = JSON.stringify(data)
        })
    }
    })
     
})