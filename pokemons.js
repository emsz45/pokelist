let offset = 0;
const limit = 10;

const tableBody = document.querySelector("#pokemonTable tbody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("pokemonModal");
const closeModal = document.querySelector(".close");
const pokemonName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonAbilities = document.getElementById("pokemonAbilities");

function fetchPokemons(offset, limit) {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";
            data.results.forEach((pokemon, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${offset + index + 1}</td><td>${pokemon.name}</td>`;
                row.addEventListener("click", () => fetchPokemonDetails(pokemon.url));
                tableBody.appendChild(row);
            });
        });
}

function fetchPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            pokemonName.textContent = pokemon.name;
            pokemonImage.src = pokemon.sprites.other.home.front_default;
            pokemonAbilities.innerHTML = "";
            pokemon.abilities.forEach(ability => {
                const li = document.createElement("li");
                li.textContent = ability.ability.name;
                pokemonAbilities.appendChild(li);
            });
            modal.style.display = "block";
        });
}

prevBtn.addEventListener("click", () => {
    if (offset > 0) {
        offset -= limit;
        fetchPokemons(offset, limit);
        prevBtn.disabled = offset === 0;
    }
});

nextBtn.addEventListener("click", () => {
    offset += limit;
    fetchPokemons(offset, limit);
    prevBtn.disabled = false;
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Inicializa la lista
fetchPokemons(offset, limit);
