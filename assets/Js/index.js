const apiKey = '568d4b401cc7205559dad7d46feabed8'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=568d4b401cc7205559dad7d46feabed8&units=metric&q='
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const cityApiUrl = 'https://api.unsplash.com/search/photos?query='
const cityKey = 'RAtNogTfzITeOCZO42uVsau5iORY0RZMbQ_GieRd10s'

async function checkWeather(city) {
    const data = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const response = await data.json()
    if (data.status == 404) {
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    } else {
        document.querySelector('.city').innerHTML = response.name
        document.querySelector('.temp').innerHTML = Math.round(response.main.temp) + "°C"
        document.querySelector('.humitidy').innerHTML = response.main.humidity + '%'
        document.querySelector('.wind').innerHTML = response.wind.speed + ' km/h'

        if (response.weather[0].main == 'Clouds') {
            weatherIcon.src = '../assets/Images/clouds.png'
        } else if (response.weather[0].main == 'Clear') {
            weatherIcon.src = '../assets/Images/clear.webp'
        } else if (response.weather[0].main == 'Rain') {
            weatherIcon.src = '../assets/Images/rain.png'
        } else if (response.weather[0].main == 'Drizzle') {
            weatherIcon.src = '../assets/Images/drizle.png'
        } else if (response.weather[0].main == 'Mist') {
            weatherIcon.src = '../assets/Images/mist.png'
        }
        document.querySelector('.weather').style.display = 'block'
        document.querySelector('.error').style.display = 'none'

        const cityData = await (await fetch(cityApiUrl + city + `&client_id=${cityKey}`)).json()
        document.querySelector('body').style.backgroundImage = `url(${cityData.results[0].urls.full})`

    }



}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value)

})

