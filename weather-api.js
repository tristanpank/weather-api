

// Using async/await
const getWeatherData = async (city) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let specificData = {
        "name": data.name,
        "main": data.main,
        "clouds": data.clouds,
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

let weatherTest = document.getElementById("weather-test");
let submitButton = document.getElementById("submit");
submitButton.addEventListener('click', async () => {
    let cityInput = document.getElementById("city");
    let weatherData = await getWeatherData("Ocala");
    console.log(weatherData);
})