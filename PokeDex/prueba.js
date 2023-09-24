const pokemonContainer = document.querySelector(".pokemonContainer")


function searchByIdPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(respuesta => respuesta.json())
    .then(data => createPokemon(data))
}

function showPokemon(howMany){
    for (var i = 1; i <= howMany; i++) {
        searchByIdPokemon(i);
    }
}

function createPokemon(pokemon) {
    //Crear contenedor donde estará el pokemon
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    //Crear contenedor donde se mostrará el Pokemon
    const imgContainerPokemon = document.createElement('div');
    imgContainerPokemon.classList.add('img-pokemon');

    //Crear Imagen de Pokemon
    const imgPokemon = document.createElement('img');
    imgPokemon.src = pokemon.sprites.other['official-artwork'].front_default;

    // Poner la Imagen del Pokemon dentro del contenedor.
    imgContainerPokemon.appendChild(imgPokemon);
    

    // ID de Pokemon
    const numPokemon = document.createElement('p');
    numPokemon.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    // Crear nombre, añadir clase Name y el nombre del Pokemon
    const name = document.createElement('button');;
    name.id = 'myPokemon';
    name.innerText = pokemon.name;
    name.addEventListener('click', () =>{
        Swal.fire({
            title: `${pokemon.name}`,
            text: 'Modal with a custom image.',
            imageUrl: `${pokemon.sprites.other.dream_world.front_default}`,
            // imageUrl:  `${(img) ?  img : defaultImg}`,
            html: `
                ${pokemon.stats.map(data=>`
                    <input 
                        type="range" 
                        id="uno" 
                        value="${data.base_stat}">
                    <label for="uno"> 
                        ${data.base_stat} 
                        ${data.stat.name}</label><br>
                        `).join("")}   
            `,
            imageWidth: "80%",
            imageHeight: "80%",
        });
    })


    // Añadir elementos a Card

    card.appendChild(imgContainerPokemon);
    card.appendChild(numPokemon);
    card.appendChild(name);

    pokemonContainer.appendChild(card);

}
showPokemon(10);