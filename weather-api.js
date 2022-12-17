

// Using async/await
const getWeatherData = async (city) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    console.log(data);
    let specificData = {
        "name": data.name,
        "main": data.main,
        "clouds": data.clouds,
        "wind": data.wind,
        "wind_speed": data.wind.speed,
        "temp": convertToFarenheight(data.main.temp),
        "temp_min": convertToFarenheight(data.main.temp_min),
        "temp_max": convertToFarenheight(data.main.temp_min),
        "humidity": `${data.main.humidity}%`,
    }
    
    return specificData;
    // let kelvinTemp = data.main.temp;
    // let farenheightTemp = (kelvinTemp - 273.15) * (9/5) + 32;
    // farenheightTemp = farenheightTemp.toFixed(2)
    // weatherTest.textContent = `${farenheightTemp} degrees`;
}

// Using promises
const getWeatherData2 = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"})
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        let kelvinTemp = data.main.temp;
        let farenheightTemp = (kelvinTemp - 273.15) * (9/5) + 32;
        farenheightTemp = farenheightTemp.toFixed(2)
        weatherTest.textContent = `${farenheightTemp} degrees`;
    })
}

function convertToFarenheight(kelvin) {
    return ((kelvin - 273.15) * (9/5) + 32).toFixed(2);
}


function main() {
    let weatherTest = document.getElementById("weather-test");
    let submitButton = document.getElementById("submit");
    let weatherText = document.querySelectorAll(".weather-text");
    for (let i=0; i < weatherText.length; i++){
        weatherText[i].textContent = weatherText[i].id;
    }
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        let cityInput = document.getElementById("city");
        try{
            let weatherData = await getWeatherData(cityInput.value);
            console.log(weatherData);
            console.log(convertToFarenheight(weatherData.main.temp));
            for (let i = 0; i < weatherText.length; i++){
                weatherText[i].textContent = weatherData[weatherText[i].id];
            }
        }
        catch (err){
            console.log(err);
        }
    })
}

main();