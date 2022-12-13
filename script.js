//URL's
const api_key = 'api_key=85b94a9f22d345da9d5c2c8725f134de';
const main_URL= 'https://api.themoviedb.org/3';
const img_url = `https://image.tmdb.org/t/p/w500`;
const home = main_URL + `/movie/popular?` + api_key;
const movie_search = main_URL + `/search/movie?` + api_key;
const tv_search = main_URL + `/search/tv?` + api_key;


const form =  document.querySelector('form');
const main = document.getElementById('main');
const search = document.getElementById('search');
const pick_movie = document.getElementById ('pick-movie')
const pick_tv = document.getElementById ('pick-tv')

//get movies
function getMovies (url) {
    fetch(url)
    .then(response => response.json())
    .then (data => {
        console.log(data.results);
        showMovies(data.results);
    }) 
    .catch((err) => {
        document.querySelector('main').innerHTML = `Movie Not Found`;
    }) 
}
getMovies (home)

//show movies
function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, overview, release_date} = movie;
        const movie_card = document.createElement('div');
        movie_card.classList.add('movie');
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

//pick tv 
pickTV();
function pickTV() {
    pick_tv.addEventListener('click', () => {
        main.innerHTML='';
    })
    

}

//search movie
form.addEventListener ('submit', (ev) =>{
    ev.preventDefault();
    const movSearchname = search.value;
    if(movSearchname){
        getMovies(movie_search+'&query='+movSearchname);
    }else{
        getMovies(home);
    }
})


//search tv
form.addEventListener ('submit', (ev) =>{
    ev.preventDefault();
    const tvsearchname = search.value;
    if(tvsearchname){
        getMovies(tv_search+'&query='+tvsearchname);
    }else{
        getMovies(home);
    }
})



