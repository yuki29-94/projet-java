document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'dcb539f3';
    let searchTerm = '';
    let page = 1;

    const searchInput = document.getElementById('search-bar');
    const searchResultsDiv = document.getElementById('search-results');

    async function performSearch() {
        const url = `http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Search) {
            data.Search.forEach(movie => {
                if (movie.Poster !== 'N/A') {
                    const movieDiv = document.createElement('div');
                    movieDiv.classList.add('movie-card');
                    movieDiv.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h2>${movie.Title}</h2>
                        <a href="movie.html?id=${movie.imdbID}" class="btn btn-primary">En savoir plus</a>
                    `;
                    searchResultsDiv.appendChild(movieDiv);
                }
            });
        }
    }

    searchInput.addEventListener('input', () => {
        clearTimeout(searchInput.delay);
        searchInput.delay = setTimeout(() => {
            searchTerm = searchInput.value;
            page = 1;
            searchResultsDiv.innerHTML = '';
            if (searchTerm.trim()) {
                performSearch();
            }
        }, 300); 
    });

   
    document.getElementById('load-more-search').addEventListener('click', () => {
        page++;
        performSearch();
    });
});
