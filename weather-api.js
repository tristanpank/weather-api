class InputBox {
    constructor (element) {
        this.valid = true;
        this.submitted = false;
        this.element = element;
    }
    changeBorder () {
        if (this.valid === false) {
            this.element.style.borderColor = "red";
        } else {
            this.element.style.borderColor = null;
        }
        this.element.value = "";
    }
    changeValidFalse () {
        this.valid = false;
    }
    changeValidTrue () {
        this.valid = true;
    }
}


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
        "wind_speed": `${data.wind.speed} m/s`,
        "temp": convertToFarenheight(data.main.temp),
        "temp_min": convertToFarenheight(data.main.temp_min),
        "temp_max": convertToFarenheight(data.main.temp_max),
        "humidity": `${data.main.humidity}%`,
        "condition": data.weather[0].main,
        "feels_like": convertToFarenheight(data.main.feels_like),
    }
    
    return specificData;
    // let kelvinTemp = data.main.temp;
    // let farenheightTemp = (kelvinTemp - 273.15) * (9/5) + 32;
    // farenheightTemp = farenheightTemp.toFixed(2)
    // weatherTest.textContent = `${farenheightTemp} degrees`;
}

const getGif = async (searchType) => {
    let response = await fetch(`http://api.giphy.com/v1/gifs/translate?s=${searchType}&api_key=0Q5Jf6P8VsmDv5VNeUwzQrFNRj5u3wFt`, {mode: "cors"});
    let data = await response.json();
    console.log(data);
    return data;
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
    return ((kelvin - 273.15) * (9/5) + 32).toFixed(2) + " °F";
}

function resetDivs(divs, data=undefined) {
    // resets temperature divs
    for (let i = 0; i < divs.length; i++) {
        if (data === undefined) {
            divs[i].textContent = 30;
        } else {
            divs[i].textContent = data[divs[i].id];
        }
    }
    // checks for weather title
    let breakdownTitle = document.getElementById("weather-breakdown");
    if (data === undefined) {
        breakdownTitle.textContent = "";
    } else {
        breakdownTitle.textContent = "Weather Breakdown";
    }
}

function getConditionSrc(weatherData) {
    possibleConditions = {
        "Thunderstorm": "thunder",
        "Drizzle": "rainy-4",
        "Rain": "rainy-6",
        "Snow": "snowy-6",
        "Clear": "day",
        "Clouds": "cloudy-day-2",
    }

    let conditionSrc;
    if (weatherData.condition in possibleConditions) {
        conditionSrc = possibleConditions[weatherData.condition];
    } else {
        conditionSrc = "day";
    }
    return conditionSrc;

    // try {
    //     let conditionSrc = possibleConditions[weatherData.condition];
    //     return conditionSrc;
    // } catch (err) {
    //     console.log(err);
    //     let conditionSrc = "day";
    //     return conditionSrc;
    // } 

}

function main() {
    let submitButton = document.getElementById("submit");
    // Selects all divs associated with weather info
    let weatherText = document.querySelectorAll(".weather-text");
    resetDivs(weatherText);

    let weatherGif = document.getElementById("weather-gif");

    let inputBoxElement = document.getElementById("location");
    let inputBox = new InputBox(inputBoxElement);
    let locationName = document.getElementById("name");
    let row2Children = document.getElementById("row2children");
    let imgCondition = document.getElementById("img-condition");
    
    
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        try{
            let weatherData = await getWeatherData(inputBox.element.value);
            // let gifData = await getGif("sky");
            // weatherGif.src = gifData.data.images.original.url;
            console.log(weatherData);
            console.log(convertToFarenheight(weatherData.main.temp));
            resetDivs(weatherText, weatherData);
            inputBox.changeValidTrue();
            locationName.textContent = weatherData.name;
            imgCondition.src = `./amcharts_weather_icons_1.0.0/animated/${getConditionSrc(weatherData)}.svg`;
            row2Children.style.opacity = 100; 

        } catch (err) {
            console.log(err);
            resetDivs(weatherText);
            inputBox.changeValidFalse();
            locationName.textContent = "Invalid Location";
            row2Children.style.opacity = 0;
        } finally {
            inputBox.changeBorder();
        }
    })

    // getGif("snow");
}

main();