const key = '6N99yzNbSSsN5auPX3seGkVGH7xo1gMO';


// get weather information
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    //console.log(data[0]);
    return data[0];
}

// get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    //console.log(data[0].Key);
    return data[0];
}

// getCity('Belgrade').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     // console.log(data);
//     return data;
// }).catch(err => console.log(err));
