import { fetchError, NetworkError } from './errors.js';

// Base URLs and API key
const apiKey = 'api_key=e94e64e18c1914ecd6e27ed8ecb936dc';
const mainURL = 'https://api.themoviedb.org/3';
const imgURL = 'https://image.tmdb.org/t/p/w500'; 3

// Endpoints
const endpoints = {
    home: `${mainURL}/movie/popular?${apiKey}`,
    tvHome: `${mainURL}/tv/popular?${apiKey}`,
    movieSearch: `${mainURL}/search/movie?${apiKey}`,
    tvSearch: `${mainURL}/search/tv?${apiKey}`,
};

const form = document.querySelector('form');
const main = document.getElementById('main');
const search = document.getElementById('search');
let currentType = 'movie';

// Utility function for fetching data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new NetworkError(`Fetch error: ${response.statusText}`);
        return await response.json();
    } catch (err) {
        console.error(err);
        throw new fetchError(err);
    }
}

// Display data
function displayData(data, type) {
    const titleText = type === 'tv' ? 'Popular Shows' : 'Popular Movies';
    search.placeholder = type === 'tv' ? "Search Shows..." : "Search Movies...";
    currentType = type;

    const subtitle = document.getElementById('subtitle');
    subtitle.textContent = titleText;

    main.innerHTML = data.map(item => {
        const { title, name, poster_path, overview, first_air_date, release_date } = item;
        const itemName = title || name;
        const date = first_air_date || release_date;

        return `
            <div class="card">
                <a href="">
                    <img src="${imgURL}${poster_path}" alt="${itemName}">
                    <div class="movie-info">
                        <h2>${itemName}</h2>
                        <div class="overview">
                            <h4>Description:</h4>
                            <p>${overview}</p>
                            <h4>Release Date:</h4>
                            <p>${date}</p>
                        </div>
                    </div>
                </a>
            </div>`;
    }).join('');
}

// Initialize
function init() {
    document.addEventListener('DOMContentLoaded', () => {
        history.replaceState(null, null, './index.html');
    });

    document.getElementById('pick-movie').addEventListener('click', async () => {
        const data = await fetchData(endpoints.home);
        displayData(data.results, 'movie');
        document.getElementById('form').classList.remove('hidden'); // Show the form
    });

    document.getElementById('pick-tv').addEventListener('click', async () => {
        const data = await fetchData(endpoints.tvHome);
        displayData(data.results, 'tv');
        document.getElementById('form').classList.remove('hidden'); // Show the form
    });

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const searchValue = search.value.trim();
        const searchURL = currentType === 'tv' ? endpoints.tvSearch : endpoints.movieSearch;
        if (searchValue) {
            const data = await fetchData(`${searchURL}&query=${encodeURIComponent(searchValue)}`);
            displayData(data.results, currentType);
        }
    });
}


init();
