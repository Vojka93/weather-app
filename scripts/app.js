// Dom manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;
    // same thing 
    const { cityDets, weather } = data; // Destructuring

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>        
    `;

    // update the night/day and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

}

// since updateCity is async, when called, it will return promise!
const updateCity = async (city) => {

    

    // getCity is async function. Thefore it returns a promise.
    // Since it returns a promise I can then use await to make sure this is finished before we asign value to cityDets

    // await practically means: WAIT TILL I GET THE VALUE AND THEN ASIGN IT TO cityDets
    const cityDets = await getCity(city);
    //console.log(cityDets);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };

    // I can call these functions because forecast.js defines the. And forecast.js comes before app.js!

}

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update ui with new city
    // returning promise, so I need to tackle .then() method
    updateCity(city)
        .then(data => {
            updateUI(data)
            console.log(data);
        })
        .catch(err => console.log(err));
})