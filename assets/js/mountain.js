function weatherApi(city) {
    const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f17cdee71ab6fd1bb23dabba013e8338&units=imperial';

    return fetch(weatherApiUrl)
        .then((res) => res.json())
        .then((data) => data);
}


function trailApi() {
    const url =
        'https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=35.6009&lon=-82.554&per_page=60&radius=50';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1f0b7157ccmsh7f554ec9f480740p158964jsn959136ae0ee2',
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
        },
    };

    return fetch(url, options)
        .then((res) => res.json())
        .then((data) => data);
}


function updateCard(trail, index) {
    const pEl = document.getElementById('pEl');
    const cardName = document.createElement('div');
    const cardCity = document.createElement('h5');
    const cardDifficulty = document.createElement('p');
    const cardUrl = document.createElement('a');

    cardName.classList.add('card-body');
    cardCity.classList.add('card-title');
    cardDifficulty.classList.add('card-text');
    cardUrl.classList.add('btn', 'btn-primary');

    if (index >= 0 && trail) {
        cardName.textContent = 'Trail: ' + trail.name;
        cardCity.textContent = 'City: ' + trail.city;
        cardDifficulty.textContent = 'Difficulty: ' + trail.difficulty;
        cardUrl.textContent = 'Check Weather';

        weatherApi(trail.city)
            .then((weatherData) => {
                cardUrl.href = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f17cdee71ab6fd1bb23dabba013e8338&units=imperial';
                pEl.appendChild(cardName);
                pEl.appendChild(cardCity);
                pEl.appendChild(cardDifficulty);
                pEl.appendChild(cardUrl);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    } else {
        cardName.textContent = 'Invalid Index or Data';
        pEl.appendChild(cardName);
    }
}


trailApi()
    .then((data) => {
        const filterRating = data.data.filter((item) => item.rating > 3.4);
        filterRating.forEach((trail, index) => {
            updateCard(trail, index);
        });
    })
    .catch((error) => {
        console.error('Error fetching trail data:', error);
    });
