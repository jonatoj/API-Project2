'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    $('.js-error').empty();
    $('.results-list').empty();

    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-list').append(
            `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].directionsInfo}</p>
        </li>`);
    }
    $('.results').removeClass('hidden')
}
function getParks(parkSearch, maxResults=10, apiKey, searchURL) {
    const params = {
        stateCode: parkSearch,
        limit: maxResults
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString + apiKey;
    console.log(url);

    fetch(url) 
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error').text(`Something went wront: ${err.message}`);
    });
}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const parkSearch = $('#js-park-search').val();
        const maxResults = $('#js-max-results').val();
        const apiKey = 'cHVbNz0YTYZ9YUIM7k3jBwjHq4SQpKfn301e9KFa'
        const searchURL = 'https://api.nps.gov/api/v1/parks'
        getParks(parkSearch, maxResults, apiKey, searchURL)
    })
}

$(watchForm);
