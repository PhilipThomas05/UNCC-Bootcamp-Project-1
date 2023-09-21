fetch('https://api.openweathermap.org/data/2.5/weather?q=asheville&appid=f17cdee71ab6fd1bb23dabba013e8338&units=imperial')
.then(res => {
   return res.json();
})
.then(data => {
    console.log(data);
});


const url = 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=35.6009&lon=-82.554&per_page=60&radius=50';
const options = {
method: 'GET',
headers: {
'X-RapidAPI-Key': '1f0b7157ccmsh7f554ec9f480740p158964jsn959136ae0ee2',
'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
}
};

fetch(url, options)
.then(res => {
return res.json();
})
.then(data => {
console.log(data);
const filterRating = data.data.filter((item) => item.rating > 3.4);
console.log(filterRating);
})

