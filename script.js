const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const colors = {
    fire: '#fd7d24',
    grass: '#9bcc50',
    electric: '#eed535',
    water: '#4592c4',
    ground: '#ab9842',
    rock: '#a38c21',
    fairy: '#fdb9e9',
    poison: '#b97fc9',
    bug: '#729f3f',
    dragon: '#7038f8',
    psychic: '#f366b9',
    flying: '#3dc7ef',
    fighting: '#d56723',
    normal: '#a4acaf',
    ice: '#51c4e7',
    ghost: '#7b62a3',
    dark: '#707070',
    steel: '#9eb7b8'
};

const main_types = Object.keys(colors);
// ["fire", "grass", "electric"]

let allPokemon = [];

const fetchPokemon = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        let p = await getPokemon(i);
        if(p.name === "mr-mime") {
            p.name = "Mr. Mime";
        }
        p.isFavorite = false;
        allPokemon.push( p );
    }
};

const getPokemon = async function(id) {
    // get pokemon data from pokeapi
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    
    return data;
    //createPokemonCard( data );
};

const renderPokemon = async function( pokemonArray ) {
    pokemonArray.forEach( pokemon => createPokemonCard(pokemon));
};

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name);
    //const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const type1 = pokemon.types[0].type.name;
    const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : null;
    const color = colors[type1];
    const color2 = colors[type2];
    
    const officialArtwork = pokemon.sprites.other["official-artwork"].front_default;
    
    if (type2 != null) {
        pokemonEl.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0) 0%,${color} 1%,${color2} 100%)`;
        const pokemonInnerHTML = `
        <div class="star-btn"> <a href="#" id=${pokemon.id} > ☆ </a></div>
        <div class="img-container">
        <!--<img id="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">-->
        <img src="${officialArtwork}" />
        </div>
        <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type1} | ${type2}</span> </small>
        </div>
        `;
        pokemonEl.innerHTML = pokemonInnerHTML;
    }
    else {
        //★
        pokemonEl.style.backgroundColor = color;
        const pokemonInnerHTML = `
        <div class="star-btn"> <a href="#" id=${pokemon.id} > ☆ </a></div>
        <div class="img-container">
        <!--<img id="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">-->
        <img src="${officialArtwork}" />
        </div>
        <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type1}</span> </small>
    </div>
    `;
    pokemonEl.innerHTML = pokemonInnerHTML;
    }
    poke_container.appendChild(pokemonEl);
};

// const rendershinyPokemon = async function (pokemonArray) {
//     pokemonArray.forEach(pokemon => createShinyPokemonCard(pokemon));!!!!!!!!!
// };

// shinyButton.addEventListener('click', () => {
//     rendershinyPokemon(allPokemon);
// });

async function loadAllPokemon() {
    await fetchPokemon();
    renderPokemon(allPokemon);
}

function clearPokemon() {
    poke_container.innerHTML = "";
}

loadAllPokemon();

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

function updateSearchResults() {
    const searchQuery = searchInput.value;

    // search by name
    let searchResults = allPokemon.filter( pokemon => {
        return pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // search by id
    let idSearchResults = allPokemon.filter(pokemon => {
        return pokemon.id.toString().padStart(3, '0').includes(searchQuery);
    } )


    clearPokemon();
    renderPokemon( searchResults );
    renderPokemon(idSearchResults);
}

searchButton.addEventListener('click', () => {
    updateSearchResults();
});

searchInput.addEventListener( "keyup", () => updateSearchResults() );

document.addEventListener('keypress', e => {
    if(e.key == "Enter") {
        updateSearchResults();
    }
    
});

const fireButton = document.getElementById("Fire");
const grassButton = document.getElementById("Grass");
const electricButton = document.getElementById("Electric");
const waterButton = document.getElementById("Water");
const groundButton = document.getElementById("Ground");
const rockButton = document.getElementById("Rock");
const fairyButton = document.getElementById("Fairy");
const poisonButton = document.getElementById("Poison");
const bugButton = document.getElementById("Bug");
const dragonButton = document.getElementById("Dragon");
const psychicButton = document.getElementById("Psychic");
const flyingButton = document.getElementById("Flying");
const fightingButton = document.getElementById("Fighting");
const normalButton = document.getElementById("Normal");
const iceButton = document.getElementById("Ice");
const ghostButton = document.getElementById("Ghost");
const darkButton = document.getElementById("Dark");
const steelButton = document.getElementById("Steel");
const favoriteButton = document.getElementById("Favorite");
const shinyButton = document.getElementById("Shiny");
const legendaryButton = document.getElementById("Legendary");
const resetButton = document.getElementById("Reset")

resetButton.addEventListener('click', () => updateSearchResults());

fireButton.addEventListener('click', () => {
    let fireResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'fire'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'fire'
        }
        return r
    })
    clearPokemon();
    renderPokemon(fireResults);
});

grassButton.addEventListener('click', () => {
    let grassResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'grass'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'grass'
        }
        return r
    })
    clearPokemon();
    renderPokemon(grassResults);
});
electricButton.addEventListener('click', () => {
    let electricResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'electric'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'electric'
        }
        return r
    })
    clearPokemon();
    renderPokemon(electricResults);
});
waterButton.addEventListener('click', () => {
    let waterResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'water'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'water'
        }
        return r
    })
    clearPokemon();
    renderPokemon(waterResults);
});
groundButton.addEventListener('click', () => {
    let groundResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'ground'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'ground'
        }
        return r
    })
    clearPokemon();
    renderPokemon(groundResults);
});
rockButton.addEventListener('click', () => {
    let rockResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'rock'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'rock'
        }
        return r
    })
    clearPokemon();
    renderPokemon(rockResults);
});
fairyButton.addEventListener('click', () => {
    let fairyResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'fairy'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'fairy'
        }
        return r
    })
    clearPokemon();
    renderPokemon(fairyResults);
});
poisonButton.addEventListener('click', () => {
    let poisonResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'poison'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'poison'
        }
        return r
    })
    clearPokemon();
    renderPokemon(poisonResults);
});
bugButton.addEventListener('click', () => {
    let bugResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'bug'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'bug'
        }
        return r
    })
    clearPokemon();
    renderPokemon(bugResults);
});
dragonButton.addEventListener('click', () => {
    let dragonResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'dragon'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'dragon'
        }
        return r
    })
    clearPokemon();
    renderPokemon(dragonResults);
});
psychicButton.addEventListener('click', () => {
    let psychicResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'psychic'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'psychic'
        }
        return r
    })
    clearPokemon();
    renderPokemon(psychicResults);
});
flyingButton.addEventListener('click', () => {
    let flyingResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'flying'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'flying'
        }
        return r
    })
    clearPokemon();
    renderPokemon(flyingResults);
});
fightingButton.addEventListener('click', () => {
    let fightingResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'fighting'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'fighting'
        }
        return r
    })
    clearPokemon();
    renderPokemon(fightingResults);
});
normalButton.addEventListener('click', () => {
    let normalResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'normal'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'normal'
        }
        return r
    })
    clearPokemon();
    renderPokemon(normalResults);
});
iceButton.addEventListener('click', () => {
    let iceResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'ice'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'ice'
        }
        return r
    })
    clearPokemon();
    renderPokemon(iceResults);
});
ghostButton.addEventListener('click', () => {
    let ghostResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'ghost'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'ghost'
        }
        return r
    })
    clearPokemon();
    renderPokemon(ghostResults);
});
darkButton.addEventListener('click', () => {
    let darkResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'dark'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'dark'
        }
        return r
    })
    clearPokemon();
    renderPokemon(darkResults);
});
steelButton.addEventListener('click', () => {
    let steelResults = allPokemon.filter( pokemon => {
        r = pokemon.types[0].type.name === 'steel'
        if (pokemon.types[1] != null) {
            r +=  pokemon.types[1].type.name === 'steel'
        }
        return r
    })
    clearPokemon();
    renderPokemon(steelResults);
});

const legendaryArray = ["Articuno", "Zapdos", "Moltres", "Mewtwo"]

legendaryButton.addEventListener('click', () => {
    let legendaryResults = allPokemon.filter( pokemon => {
        r = pokemon.name.toLowerCase() === 'articuno';
        r += pokemon.name.toLowerCase() === 'zapdos';
        r += pokemon.name.toLowerCase() === 'moltres';
        r += pokemon.name.toLowerCase() === 'mewtwo';
       return r
    })
    clearPokemon();
    renderPokemon(legendaryResults);
});