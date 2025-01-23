document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = 'dcb539f3';
    const trendingMoviesDiv = document.getElementById('trending-movies');

    const movieUrls = [
        'http://www.omdbapi.com/?t=avatar&y=2022&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=barbie&y=2019&plot=full&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=The+shawshank+Redemption&y=1994&plot=full&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=the+Godfather&y=1972&plot=full&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=the+Dark+Knight&y=2008&plot=full&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=Pulp+fiction&y=1994&plot=full&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=The+Lord+of+the+Rings%3A+The+Return+of+the+King&y=2003&plot=full&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=Forrest+Gump&y=1994&plot=full&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=Inception&y=2010&plot=full&apikey=' + apiKey,
        'http://www.omdbapi.com/?t=Fight+Club&y=1999&plot=full&apikey=' + apiKey
    ];

    const loadedMovies = new Set();

    async function loadMovies(urls) {
        for (let url of urls) {
            const response = await fetch(url);
            const movie = await response.json();
            console.log(movie);

            if (movie.Poster !== 'N/A' && movie.Poster && !loadedMovies.has(movie.imdbID)) {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie-card');
                movieDiv.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <a href="movie.html?id=${movie.imdbID}" class="btn btn-primary">En savoir plus</a>
                `;
                trendingMoviesDiv.appendChild(movieDiv);
                loadedMovies.add(movie.imdbID);
            }
        }
    }

    await loadMovies(movieUrls);

    const extraMoviesUrls = [
        `http://www.omdbapi.com/?t=Dune&y=2021&plot=full&apikey=${apiKey}`,
        `http://www.omdbapi.com/?t=Top+Gun%3A+Maverick&y=2022&plot=full&apikey=${apiKey}`,
        `http://www.omdbapi.com/?t=The+Batman&y=2022&plot=full&apikey=${apiKey}`,
        `http://www.omdbapi.com/?t=Black+Panther%3AWakanda+Forever&y=2022&plot=full&apikey=${apiKey}`,
        `http://www.omdbapi.com/?t=Oppenheimer&y=2023&plot=full&apikey=${apiKey}`
    ];

    document.getElementById('load-more').addEventListener('click', async () => {
        await loadMovies(extraMoviesUrls);
    });
});
