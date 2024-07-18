document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');


    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const countryCard = createCountryCard(country);
                countriesContainer.appendChild(countryCard);
            });
        })
        .catch(error => console.error('Error fetching country data:', error));

    function createCountryCard(country) {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4', 'col-lg-4', 'col-sm-12');

        const card = document.createElement('div');
        card.classList.add('card');

        const countryName = document.createElement('h5');
        countryName.classList.add('card-header', 'bg-white');
        countryName.textContent = country.name.common;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const flag = document.createElement('img');
        flag.classList.add('card-img', 'img-fluid','fixed-height');
        flag.src = country.flags.png;
        flag.alt = `${country.name.common} Flag`;



        const capital = document.createElement('p');
        capital.classList.add('card-text');
        capital.innerHTML = `<strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}`;

        const region = document.createElement('p');
        region.classList.add('card-text');
        region.innerHTML = `<strong>Region:</strong> ${country.region}`;

        const latlng = document.createElement('p');
        latlng.classList.add('card-text');
        latlng.innerHTML = `<strong>Latlng:</strong> ${country.latlng.join(', ')}`;

        const countryCode = document.createElement('p');
        countryCode.classList.add('card-text');
        countryCode.innerHTML = `<strong>Country Code:</strong> ${country.cca3}`;

        const weatherButton = document.createElement('button');
        weatherButton.classList.add('btn', 'btn-primary');
        weatherButton.textContent = 'Click for Weather';
        weatherButton.addEventListener('click', () => {
            fetchWeatherData(country.latlng[0], country.latlng[1])
                .then(weather => alert(`Current weather in ${country.capital ? country.capital[0] : country.name.common}: ${weather.weather[0].description}`))
                .catch(error => console.error('Error fetching weather data:', error));
        });

        cardBody.appendChild(capital);
        cardBody.appendChild(region);
        cardBody.appendChild(latlng);
        cardBody.appendChild(countryCode);
        cardBody.appendChild(weatherButton);

        card.appendChild(countryName);
        card.appendChild(flag);
        card.appendChild(cardBody);
        
        col.appendChild(card);

        card.style.display = "flex";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";

        return col;
    }

    function fetchWeatherData(lat, lon) {
        const apiKey = '007c183481bd0ed96c9eb59a7a4441f2';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        return fetch(url)
            .then(response => response.json());
    }
});
