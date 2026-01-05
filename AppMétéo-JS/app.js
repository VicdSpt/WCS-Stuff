const showLoader = document.querySelector(".weather-app__loader-container")
const errorInformation = document.querySelector(".weather-app__error-info")

async function getWeatherData(){
    showLoader.classList.add("js-loader-active")
    let data;
    try{
        const response = await fetch("./weatherAPI/weatherData.json")

        if(!response.ok){
            throw new Error()
        }
        data = await response.json()
    }
    catch(error){
        errorInformation.computedStyleMap.display = "block";
        errorInformation.textContent = "Error while loading the data";
        return
    }
    finally{
        showLoader.classList.remove("js-loader-active")
    }

    populateUI(data)
}
getWeatherData()

const cityName = document.querySelector(".weather-app__city")
const countryName = document.querySelector(".weather-app__country")
const temperature = document.querySelector(".weather-app__temp")
const infoIcon = document.querySelector(".weather-app__info-icon")

function populateUI(data){
    cityName.textContent = data[0].city;
    countryName.textContent = data[0].country;
    temperature.textContent = `${data[0].temperature}°`;
    infoIcon.src = `ressources/icons/${data[0].iconID}.svg`;
    infoIcon.style.display = "block"
}