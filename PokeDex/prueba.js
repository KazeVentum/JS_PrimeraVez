const pokemonContainer = document.querySelector(".pokemonContainer")

function searchByIdPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(respuesta => respuesta.json())
    .then(data => console.log(data))
}

function showPokemon(howMany){
    for (var i = 1; i <= howMany; i++) {
        searchByIdPokemon(i);
    }
}

 