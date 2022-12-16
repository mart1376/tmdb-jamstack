import {fetchError, NetworkError} from '/js/errors.js';

//URL's
const api_key = 'api_key=85b94a9f22d345da9d5c2c8725f134de';
const main_URL= 'https://api.themoviedb.org/3';
const img_url = `https://image.tmdb.org/t/p/w500`;
const home = main_URL + `/movie/popular?` + api_key;
const TVhome = main_URL + `/tv/popular?` + api_key;
const movie_search = main_URL + `/search/movie?` + api_key;
const tv_search = main_URL + `/search/tv?` + api_key;

const form =  document.querySelector('form');
const main = document.getElementById('main');
const search = document.getElementById('search');


document.addEventListener('DOMContentLoaded', () => {
    history.replaceState(null, null, './index.html');
    window.addEventListener('hashchange', hc);
});

//history
function hc (ev){
    let href = ev.currentTarget.href;
    history.replaceState(null, null, href);
    console.log(hs);
}

//clear main screen of index css set up
document.querySelector('main').innerHTML = '';

// ~~~~~~~~~~~~~~~~~~TV~~~~~~~~~~~~~~~~~~~~~ //
//pick tv button
document.getElementById('pick-tv').addEventListener('click', (ev) => {

    //get TV shows
    function getTV (url) {
        fetch(url)
        .then(response => response.json())
        .then (data => {
            console.log(data.results);
            showTV(data.results);
            if(data.poster_path = null){
                document.querySelector('img').replaceWith('')
            }
        }) 
        .catch((err) => {
            if (!response.ok) throw new fetchError(response);
        }) 
    }
    getTV (TVhome)

    //show tv shows
    function showTV(data) {
        main.innerHTML = '<h3> Popular TV Shows </h3>';
        search.placeholder = "Search TV Shows";
        data.forEach(tv => {
            const { title, name, poster_path, overview, first_air_date} = tv;
            const tv_card = document.createElement('div');
            tv_card.classList.add('card');
            tv_card.innerHTML = `
                <a href="./credits.html">
                    <img src="${img_url + poster_path}" alt="${title}">
                    <div class="movie-info">
                        <h2>${name}</h2>
                        <div class="overview">
                            <h4>Description:</h4>
                            <p>${overview}</p>
                            <h4>Release Date:</h4>
                            <p>${first_air_date}</p>
                        </div>
                    </div>
                </a>
                `
            main.appendChild(tv_card);
        })
    }

    //search tv shows
    form.addEventListener ('submit', (ev) =>{
        ev.preventDefault();
        const tvSearchname = search.value;
        if(tvSearchname){
            getTV(tv_search+'&query='+tvSearchname);
        }
    })
});


// ~~~~~~~~~~~~~~~~~~~Movies~~~~~~~~~~~~~~~~~~~~ //
//pick movie button
document.getElementById('pick-movie').addEventListener('click', (ev) => {

    //get movies
    function getMovies (url) {
        fetch(url)
        .then(response => response.json())
        .then (data => {
            console.log(data.results);
            showMovies(data.results);
        }) 
        .catch((err) => {
            console.log({err});
        }) 
    }
    getMovies (home)

    //show movies
    function showMovies(data) {
        search.placeholder = "Search Movies";
        main.innerHTML = '<h3> Popular Movies </h3>';
        data.forEach(movie => {
            const { title, poster_path, overview, release_date, id} = movie;
            const movie_card = document.createElement('div');
            movie_card.classList.add('card');
            movie_card.innerHTML = `
                <a href="./credits.html">
                    <img src="${img_url + poster_path}" alt="${title}">
                    <div class="movie-info">
                        <h2>${title}</h2>
                        <div class="overview">
                            <h4>Description:</h4>
                            <p>${overview}</p>
                            <h4>Release Date:</h4>
                            <p>${release_date}</p>
                        </div>
                    </div>
                </a>
                `
            main.appendChild(movie_card);
        });
    }

    //search movies
    form.addEventListener ('submit', (ev) =>{
        ev.preventDefault();
        const movSearchname = search.value;
        if(movSearchname){
            getMovies(movie_search+'&query='+movSearchname);
        }
    });
});


// ~~~~~~~~~~~~~~ Credits ~~~~~~~~~~~~~~ //
document.querySelector('a').addEventListener('click', (ev) =>{
    const credits = main_URL + `/search/${id}/credits?` + api_key;
    function getCredits (url) {
        fetch(url)
        .then(response => response.json())
        .then (data => {
            console.log(data.id);
            showCredits(data.id);
        }) 
        .catch((err) => {
            console.log({err});
        }) 
    }
    getCredits (credits);

    //show cast
    function showCredits(data) {
        data.forEach(cast => {
            const { name, profile_path, character } = cast;
            const credit_card = document.createElement('div');
            credit_card.classList.add('credit-card');
            credit_card.innerHTML = `
                    <img src="${img_url + profile_path}" alt="${name}">
                    <div class="credits-info">
                        <h2>${name} playing ${character}</h2>
                    </div>
                `
            main.innerHTML = (credit_card);
        });
    }
});
