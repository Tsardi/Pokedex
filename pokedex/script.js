const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMONS_PER_PAGE = 20;

const pokemonGrid = document.getElementById('pokemon-grid');
const searchInput = document.getElementById('search');
const pagination = document.getElementById('pagination');
const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const modal = document.getElementById('pokemon-modal');
const closeBtn = document.querySelector('.close');
const pokemonDetails = document.getElementById('pokemon-details');

let currentPage = 1;
let totalPokemon = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemons();
    setupEventListeners();
});

function setupEventListeners() {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the page from reloading on form submission
        currentPage = 1;
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            pokemonGrid.innerHTML = ''; // Clear grid for search result
            pagination.innerHTML = ''; // Clear pagination
            fetchPokemonByName(searchTerm);
        } else {
            fetchPokemons();
        }
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Fetch functions
async function fetchPokemons() {
    try {
        const response = await fetch(`${API_URL}?limit=${POKEMONS_PER_PAGE}&offset=${(currentPage - 1) * POKEMONS_PER_PAGE}`);
        const data = await response.json();
        totalPokemon = data.count;
        displayPokemons(data.results);
        setupPagination();
    } catch (error) {
        console.error('Error fetching pokemons:', error);
    }
}

async function fetchPokemonByName(name) {
    try {
        const response = await fetch(`${API_URL}/${name}`);
        const data = await response.json();
        pokemonGrid.innerHTML = ''; // Clear grid
        pagination.innerHTML = ''; // Clear pagination
        // Display the single Pokémon card using the data we just fetched
        displaySinglePokemonCard(data);
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        pokemonGrid.innerHTML = '<p>Pokémon not found</p>';
        pagination.innerHTML = '';
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayPokemonDetails(data);
    } catch (error) {
        console.error('Error fetching pokemon details:', error);
    }
}

// Display functions
async function displayPokemons(pokemons) {
    pokemonGrid.innerHTML = '';

    for (const pokemon of pokemons) {
        const response = await fetch(pokemon.url);
        const data = await response.json();

        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemon-name">${data.name}</div>
            <div class="pokemon-id">#${data.id}</div>
        `;

        pokemonCard.addEventListener('click', () => {
            displayPokemonDetails(data);
        });

        pokemonGrid.appendChild(pokemonCard);
    }
}

function displaySinglePokemonCard(pokemonData) {
    pokemonGrid.innerHTML = ''; // Ensure grid is empty

    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';
    pokemonCard.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <div class="pokemon-name">${pokemonData.name}</div>
        <div class="pokemon-id">#${pokemonData.id}</div>
    `;

    // Add event listener to open the modal with this Pokémon's details
    pokemonCard.addEventListener('click', () => {
        displayPokemonDetails(pokemonData);
    });

    pokemonGrid.appendChild(pokemonCard);
}

function displayPokemonDetails(pokemon) {
    pokemonDetails.innerHTML = `
        <div class="pokemon-detail-header">
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <span>#${pokemon.id}</span>
        </div>
        <div class="pokemon-detail-content">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemon-stats">
                <h3>Stats</h3>
                <div class="stat-row">
                    <span>Height:</span>
                    <span>${pokemon.height / 10}m</span>
                </div>
                <div class="stat-row">
                    <span>Weight:</span>
                    <span>${pokemon.weight / 10}kg</span>
                </div>
                <h3>Abilities</h3>
                <ul>
                    ${pokemon.abilities.map(ability => `
                        <li>${ability.ability.name}</li>
                    `).join('')}
                </ul>
                <h3>Types</h3>
                <div class="types">
                    ${pokemon.types.map(type => `
                        <span class="type ${type.type.name}">${type.type.name}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Pagination
function setupPagination() {
    const totalPages = Math.ceil(totalPokemon / POKEMONS_PER_PAGE);
    pagination.innerHTML = '';

    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = 'Previous';
        prevBtn.addEventListener('click', () => {
            currentPage--;
            // To prevent showing numbers when on a single search result page
            if (searchInput.value) {
                searchInput.value = '';
            }
            fetchPokemons();
        });
        pagination.appendChild(prevBtn);
    }

    // Function to create a page button
    const createPageButton = (pageNumber) => {
        const btn = document.createElement('button');
        btn.className = 'page-btn';
        btn.textContent = pageNumber;
        if (pageNumber === currentPage) {
            btn.style.backgroundColor = '#990000'; // Active page style
        }
        btn.addEventListener('click', () => {
            currentPage = pageNumber;
            fetchPokemons();
        });
        return btn;
    };

    // Add first page button
    if (currentPage > 3) {
        pagination.appendChild(createPageButton(1));
        if (currentPage > 4) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.margin = '0 5px';
            pagination.appendChild(ellipsis);
        }
    }

    // Add page numbers around the current page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pagination.appendChild(createPageButton(i));
    }

    // Add last page button
    if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.margin = '0 5px';
            pagination.appendChild(ellipsis);
        }
        pagination.appendChild(createPageButton(totalPages));
    }

    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', () => {
            currentPage++;
            // To prevent showing numbers when on a single search result page
            if (searchInput.value) {
                searchInput.value = '';
            }
            fetchPokemons();
        });
        pagination.appendChild(nextBtn);
    }
}
```

This creates a complete Pokedex with:
1. Responsive grid layout for Pokemon cards
2. Search functionality
3. Pagination
4. Modal for detailed Pokemon view
5. Clean, modern UI with hover effects

The application is split into:
- index.html (structure)
- styles.css (presentation)
- script.js (functionality)

The Pokedex fetches data from the PokeAPI and displays Pokemon with their:
- Name
- Image
- ID number
- Stats (height, weight)
- Abilities
- Types

Users can browse through pages of Pokemon or search for specific ones, then click any Pokemon to see more details in a modal.
}
```
