document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = 'dcb539f3';
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const movieDetailsDiv = document.getElementById('movie-details');

    const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${apiKey}`);
    const movie = await response.json();

    if (movie) {
        movieDetailsDiv.innerHTML = `
            <h1>${movie.Title}</h1>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Résumé:</strong> ${movie.Plot}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Acteurs:</strong> ${movie.Actors}</p>
            <p><strong>Notes:</strong> ${movie.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join(', ')}</p>
            <p><strong>Date de sortie en DVD:</strong> ${new Date(movie.DVD).toLocaleDateString('fr-FR')}</p>
        `;
    }
});

