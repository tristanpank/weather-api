weatherTest = document.getElementById("weather-test");

const getWeatherData = async () => {
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ff959cd60bd81def53e946ffe7232d4b", {mode: "cors"});
    let data = await response.json();
    console.log(data);
    weatherTest.textContent = data.main.temp;
}

getWeatherData();