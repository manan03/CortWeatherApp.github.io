console.log("manan");
//GET ALL NECESSARY ELEMENTS FROM THE DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const form = document.getElementById('locationInput');
const windOutput = document.querySelector('.wind');
const search = document.querySelector('.search');
var btn = document.querySelector('.submit');
const cities = document.querySelector('.cities');
const details = document.querySelector('.detail');

 

// DEFAULT CITY WHEN THE PAGE LOAD 
let cityInput = "Bhilwara";
// let CITY = ["B"]
// ADD CLICK EVENTS TO EACH CITY IN THE PANEL
// cities.foreach((city) => {
    
    
// })

cities.addEventListener('click', (e) => {
   
    console.log("console");
    // CHANGE FROM DEFAULT CITY TO THE CLICKED ONE 
    cityInput = e.target.innerHTML;
    // FUNCTION THAT FETCHES AND DISPLAYS ALL THE DATA FormDataM THE WEATHER API 
    fetchWeatherData();
    // FADE OUT THE APP (SINGLE ANIMATION)
    app.style.opacity="0";
    

   });
// cities.forEach((city) => {
//     city.addEventListener('click',(e) => {
//         cityInput = e.target.innerHTML;
//         fetchWeatherData();
//         app.style.opacity = "0";
//     })
// });

// ADD SUBMIT EVENT TO THE ForM
form.addEventListener('submit',(e) => {

    // IF THE INPUT FIELD (SEARCH BAR) IS EMPTY, THROW AN ALERT
    if(search.value.length == 0){
        alert('Please type in a city name');
    }else{
    //   CHANGE FROM DEFAULT CITY TO THE ONE WRITTEN 
    // IN THE INPUT FIELD
    
    cityInput = search.value;
    
    // FUNCTION THAT FETCHES AND DISPLAY ALL THE DATA FROM THE WEATHER API 
    
    fetchWeatherData();
    
    // REMOVE ALL VALUES FROM INPUT FIELDS
    search.value = '';
     
    // FADE OUT THE APP 
    // app.style.opacity = '0';

    }

    // PREVENT THE DEFAULT BEHAVIOUR OF THE FORM

    e.preventDefault();
});

// FUNCTION THAT RETURNS A DAY OF THE WEEK FROM A DATAE 
function dayOfTheWeek(day, month , year){
const weekday = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function myDate(d,m,y) {
    var a = new Date(d,m,y);
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var r = weekdays[a.getDay()];
    return r;
}

var out = myDate(16,01,2022);
console.log(out);

// var out = dayOfTheWeek(16,01,2022);
// console.log(out);
// FUNCTION THAT FETCHES AND DISPLAYS THE DATA FROM THE WEATHER APP
function fetchWeatherData(){

    // FETCH THE DATA AND DYNAMICALLY ADD THE CITY NAME WITH THE TEMPALTE LITERALS

fetch(` 
http://api.weatherapi.com/v1/current.json?key=29e0305b45ee47ed901211041221501&q= ${cityInput}`)

    // TAKE THE DATA (WHICH IS IN JSON FORMAT)/
    // AND CONVERT IT TO A REGULAR JS OBJECT
    .then(response => response.json())
    .then(data => {
        // YOU CAN CONSOLE LOG THE DATA TON SEE WHAT IS AVAILABLE
        console.log(data);
        
        // LETS START BY ADDING THE TEMPERATURE AND WEATHER CONDITION TO THE PAGE

        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML =  data.current.condition.text;

        // GET THE DATA AND TIME FROM THE CITY AND EXTRACT THE DAY , MONTH , YEAR AND TIME INTO INDIVIDUAL VARIABLES

        const date = data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const m = parseInt(date.substr(5,2));
        const d = parseInt(date.substr(8,2));
        const time = date.substr(11);
        // REFORMAT THE ATE INTO SOMETHING MORE APPEAELING AND ADD IT TO THE PAGE 
        // ORIGINAL FORMAT: 2021-10-09 17:53
        // NEW FORMAT: 17:53 - FRIDAY 9, 10 2021
        
        dateOutput.innerHTML = `${myDate(d,m,y)} ${d},${m} ${y}`;
        // console.log(dateOutput);
        timeOutput.innerHTML = time;
        // ADD THE NAMEOF THE CITY INTO THE PAGE
        nameOutput.innerHTML = data.location.name;
        
        // GET THE CORRESPONDING ICON URL 

        const iconID = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length);
         
        // REFORMAT THE ICON URL TO YOUR OWN LOCAL FORLDER PATH AND ADD IT TO THE PAGE 
        
        icon.src = "./weather/" + iconID;
         
        // ADD THE WEATHER DETAILS TO THE PAGE 
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";
        
        // SET DEFAULT TIME OF THE DAY
        let timeofDay = "DAY";
        
        // GET THE UNIQUE ID FOR EACH WEATHER CONDITION
        const code = data.current.condition.code;
        
        // CHANGE TO NIGHT IF ITS NIGHT TIME IN THE CITY
        if(!data.current.is_day){
            timeofDay = "NIGHT";
        }

        if(code == 1000){
            // SET THE BACKGROUND IMAGE TO 
            // CLEAR IF THE WEATHER IS CLEAR
            app.style.backgroundImage = `url(./BG/${timeofDay}/clear.jpg)`;
            // btn.style.background = "#e5ba92"; 
            if(timeofDay = "NIGHT"){
                // btn.style.background = "#181e27";
            }
        }
        else if( code == 1003 || code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282 
            ){
                app.style.backgroundImage = `url(./BG/${timeofDay}/cloudy.jpg)`;
                // btn.style.background = "#fa6d1b"; 
                if(timeofDay = "NIGHT"){
                    // btn.style.background = "#181e27";
                }
            }
        
        else if( code == 1063 || code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                 
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 || 
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                 
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ){
                app.style.backgroundImage = `url(./BG/${timeofDay}/rainy.jpg)`;
                // btn.style.background = "#647d75"; 
                if(timeofDay = "NIGHT"){
                    // btn.style.background = "#325c80";
                }
            }

        else{
                app.style.backgroundImage = `url(./BG/${timeofDay}/snowy.jpg)`;
                // btn.style.background = "#4d72aa"; 
                if(timeofDay = "NIGHT"){
                    // btn.style.background = "#1b1b1b";
                }
            }
        app.style.opacity = "1";
    })

    // if the user types a city that doesent exist
     .catch(() => {
        alert('City not found, please try again');
        app.style.opacity = "1";
     });
}

// CALL THE FUNCTION ON PAGE LOAD 
fetchWeatherData();

// FADE IN THE PAGE
app.style.opacity = "1";


 