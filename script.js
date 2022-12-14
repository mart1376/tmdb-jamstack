import {fetchError, NetworkError} from './custom-errors.js';

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
const pick_movie = document.getElementById ('pick-movie')
const pick_tv = document.getElementById ('pick-tv')

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
        }) 
        .then((response) => {
            if (!response.ok) throw new fetchError(response);
        })
        .catch((err) => {
            console.log({err});
        }) 
    }
    getTV (TVhome)

    //show tv shows
    function showTV(data) {
        main.innerHTML = '<h3> Popular TV Shows </h3>';
        document.getElementById('search').placeholder = "Search TV Shows";
        data.forEach(tv => {
            const { title, name, poster_path, overview, release_date} = tv;
            const tv_card = document.createElement('div');
            tv_card.classList.add('card');
            tv_card.innerHTML = `
                <img src="${img_url + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h2>${name}</h2>
                    <div class="overview">
                        <h4>Description:</h4>
                        <p>${overview}</p>
                        <h4>Release Date:</h4>
                        <p>${release_date}</p>
                    </div>
                </div>
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
        }else{
            getTV(TVhome);
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
        .then((response) => {
            if (!response.ok) throw new fetchError(response);
        })
        .catch((err) => {
            console.log({err});
        }) 
    }
    getMovies (home)

    //show movies
    function showMovies(data) {
        main.innerHTML = '<h3> Popular Movies </h3>';
        document.getElementById('search').placeholder = "Search Movies";
        data.forEach(movie => {
            const { title, poster_path, overview, release_date} = movie;
            const movie_card = document.createElement('div');
            movie_card.classList.add('card');
            movie_card.innerHTML = `
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
                `
            main.appendChild(movie_card);
        })
    }

    //search movies
    form.addEventListener ('submit', (ev) =>{
        ev.preventDefault();
        const movSearchname = search.value;
        if(movSearchname){
            getMovies(movie_search+'&query='+movSearchname);
        }else{
            getMovies(home);
        }
    })
});

// ~~~~~~~~~~~~~~~~~~~Credits Page~~~~~~~~~~~~~~~~~~~~ //


