function createCard(trail, weather) {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card');

    const cardName = document.createElement('h2');
    cardName.textContent = 'Trail: ' + trail.name;

    const cardDifficulty = document.createElement('p');
    cardDifficulty.textContent = 'Difficulty: ' + trail.difficulty;

    const cardTemp = document.createElement('h3');
    cardTemp.textContent = weather.main.temp + ' °F';

    const cardUrl = document.createElement('a');
    cardUrl.textContent = 'Trail Website';
    cardUrl.href = trail.url;

    cardBody.appendChild(cardName);
    cardBody.appendChild(cardDifficulty);
    cardBody.appendChild(cardTemp);
    cardBody.appendChild(cardUrl);

    return cardBody;
}

function appendCardToPage(card) {
    const pEl = document.getElementById('pEl');
    pEl.appendChild(card);
}

function weatherApi(city, trail, index) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f17cdee71ab6fd1bb23dabba013e8338&units=imperial`;

    fetch(weatherApiUrl)
        .then((res) => res.json())
        .then((data) => {
            // Create the card and append it to the page
            const card = createCard(trail, data);
            appendCardToPage(card);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

function trailApi() {
    const url =
        'https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=35.6009&lon=-82.554&per_page=11&radius=50';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1f0b7157ccmsh7f554ec9f480740p158964jsn959136ae0ee2',
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
            const filterRating = data.data.filter((item) => item.rating > 3.4);
            filterRating.forEach((trail, index) => {
                weatherApi(trail.city, trail, index);
            });
        })
        .catch((error) => {
            console.error('Error fetching trail data:', error);
        });
}

// Call the trailApi function to start the process
trailApi();