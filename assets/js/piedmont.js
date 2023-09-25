function updateCard(trail, index, weather) {
    const pEl = document.getElementById('pEl');
    const cardBody = document.createElement('div')
    const cardName = document.createElement('h2');
    const cardDifficulty = document.createElement('p');
    const cardUrl = document.createElement('a');
    const cardTemp = document.createElement('h3');
    cardBody.classList.add('card')
    cardBody.setAttribute('id', 'zoom')
    const cel = document.getElementById('zoom')
    cardName.classList.add('card-body');
    cardDifficulty.classList.add('card-text');
    cardUrl.classList.add('btn', 'btn-primary');
    cardTemp.classList.add('card-temp')
    if (index >= 0 && trail) {
        cardName.textContent = 'Trail: ' + trail.name;
        cardDifficulty.textContent = 'Difficulty: ' + trail.difficulty;
        cardUrl.textContent = 'Trail Website';
        cardUrl.href = trail.url
        cardTemp.textContent = weather.main.temp + ' °F';
    } else {
        cardName.textContent = 'Invalid Index or Data';
        pEl.appendChild(cardName);
    }
    pEl.appendChild(cardBody)
    cel.appendChild(cardName);
    cel.appendChild(cardTemp);
    cel.appendChild(cardDifficulty);
    cel.appendChild(cardUrl);
}


function weatherApi(city,trail,index) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f17cdee71ab6fd1bb23dabba013e8338&units=imperial`;
    fetch(weatherApiUrl)
        .then((res) => res.json())
        .then((data) => {
            // cardUrl.href = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f17cdee71ab6fd1bb23dabba013e8338&units=imperial';
            
            console.log(data);
            updateCard(trail,index,data);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

function trailApi() {
    const url =
        'https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=36.1766&lon=-86.7819&per_page=11&radius=50';
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
                //updateCard(trail, index);
                weatherApi(trail.city,trail,index)
            });
        })
        .catch((error) => {
            console.error('Error fetching trail data:', error);
        });
    
}

trailApi();
