

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

function resetDivs(divs, data=undefined) {
    for (let i = 0; i < divs.length; i++) {
        if (data === undefined) {
            divs[i].textContent = divs[i].id;
        } else {
            divs[i].textContent = data[divs[i].id];
        }
    }
}

function main() {
    let submitButton = document.getElementById("submit");
    // Selects all divs associated with weather info
    let weatherText = document.querySelectorAll(".weather-text");
    resetDivs(weatherText);
    
    
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        let cityInput = document.getElementById("city");
        try{
            let weatherData = await getWeatherData(cityInput.value);
            console.log(weatherData);
            console.log(convertToFarenheight(weatherData.main.temp));
            resetDivs(weatherText, weatherData);
        }
        catch (err){
            console.log(err);
            resetDivs(weatherText);
        }
    })
}

main();