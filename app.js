const axios = require('axios');
const inquirer = require('inquirer');

async function getWeatherInfo(countryName) {
  try {

    const geoResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${countryName}.json?access_token=YOUR_MAPBOX_API_KEY`
        );

    
    const { features } = geoResponse.data;
    if (features.length === 0) {
      throw new Error('Country not found');
    }

    const [longitude, latitude] = features[0].center;

   
    const weatherResponse = await axios.get(
      "https://api.weatherapi.com/v1/current.json?key=f333d1279ee24111b16140823232311&q=egypt"
    );

    const { location, current } = weatherResponse.data;
    const currentWeather = current.condition.text;
    const temperature = current.temp_c;

 
    console.log(`Country: ${location.country}`);
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    console.log(`Current Weather: ${currentWeather}`);
    console.log(`Temperature: ${temperature}°C`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function main() {
  try {
    
    const { countryName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'countryName',
        message: 'Enter the name of the country:',
      },
    ]);

    await getWeatherInfo(countryName);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();

