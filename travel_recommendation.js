async function fetchData() {
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();
    return data;
}

document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const data = await fetchData();
    const results = [];
    
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
                results.push(city);
            }
        });
    });

    data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(query) || temple.description.toLowerCase().includes(query)) {
            results.push(temple);
        }
    });

    data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(query) || beach.description.toLowerCase().includes(query)) {
            results.push(beach);
        }
    });

    displayResults(results);
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <img src="${item.imageUrl}" alt="${item.name}">
        `;
        resultsContainer.appendChild(resultItem);
    });
}

document.getElementById('clear-button').addEventListener('click', () => {
    document.getElementById('search-bar').value = '';
    document.getElementById('results').innerHTML = '';
});
