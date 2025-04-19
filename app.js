let search = document.getElementById("search");
let div = document.getElementById("div");      

function showLoading() {
    Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });
}

function fatch(){
    if (!search.value.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a city name!',
        });
        return;
       
    }
    
    showLoading();
    
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=360fe8255eeec40c0a2efd2a73bf5742&units=metric`)
    .then((res)=>{
        const weather = res.data.weather[0].main.toLowerCase();
        const description = res.data.weather[0].description;
        const capitalizedDesc = description.charAt(0).toUpperCase() + description.slice(1);
        
        
        
        document.body.className = ""; 
        document.body.classList.add(weather);
        search.value="";
    
    div.innerHTML = `
    <h1>${res.data.name}</h1>
    <p>Temperature: ${Math.round(res.data.main.temp)} °C</p>
    <p>Feels Like: ${Math.round(res.data.main.feels_like)} °C</p>
    <p>Humidity: ${res.data.main.humidity}%</p> 
    <p>Weather: ${capitalizedDesc}</p>
    <div class="weather-message">It's a ${capitalizedDesc} day! ${getWeatherEmoji(weather)}</div>
    `;
    
    const weatherImage = document.getElementById("weather-Image"); 
    
    
    Swal.close();
    console.log(res);
}

)
.catch((error) => {
    Swal.fire({
        icon: 'error',
        title: 'City Not Found',
        text: 'Please try another location.',
    });
        console.error(error);
    });
    search.value="";
}

function getWeatherEmoji(weather) {
    const emojis = {
        'clear': '☀️',
        'clouds': '☁️',
        'rain': '🌧️',
        'drizzle': '🌦️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'fog': '🌁',
        'haze': '😶‍🌫️'
    };
    return emojis[weather] || '😊';
}

document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fatch();
    }
});
document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fatch();
    }
});
