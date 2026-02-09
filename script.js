const API_KEY = '4215a9515c96d2c9d1bb6d4d9d95e0dd';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movieGrid = document.getElementById('movieGrid');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// 1. Fetch Trending Movies on Load
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data.results);
}

// 2. Display Movies in Bootstrap Cards
function displayMovies(movies) {
    movieGrid.innerHTML = ''; // Clear existing content

    movies.forEach(movie => {
        const { title, poster_path, vote_average, release_date } = movie;
        const movieCol = document.createElement('div');
        movieCol.classList.add('col');

        movieCol.innerHTML = `
            <div class="card h-100 shadow">
                <img src="${poster_path ? IMG_URL + poster_path : 'https://via.placeholder.com/500x750'}" class="card-img-top movie-poster" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${title}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-warning text-dark">★ ${vote_average.toFixed(1)}</span>
                        <small class="text-secondary">${release_date ? release_date.split('-')[0] : 'N/A'}</small>
                    </div>
                </div>
            </div>
        `;
        movieGrid.appendChild(movieCol);
    });
}

// 3. Search Functionality
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value;
    if (query) {
        getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    }
});

// Initial Load
getMovies(`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`);


const loader = document.getElementById('loader');

async function getMovies(url) {
    // 1. Show the spinner
    loader.style.display = 'inline-block';
    movieGrid.innerHTML = ''; // Optional: clear old movies while loading

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        // 2. Hide the spinner once data is ready
        loader.style.display = 'none';
        
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
        loader.style.display = 'none';
        movieGrid.innerHTML = '<p class="text-white">Something went wrong. Please try again.</p>';
    }
}



document.getElementById('Movie').addEventListener('click', () => {
    location.reload();
    });
