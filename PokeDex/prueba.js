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
    
    // Crear nombre, añadir clase Name y el nombre del Pokemon
    const name = document.createElement('button');;
    name.id = 'myPokemon';
    name.innerText = pokemon.name;
    name.addEventListener('click',async() =>{
        Swal.fire({
            title: `${pokemon.name}`,
            text: 'Modal with a custom image.',
            imageUrl: `${pokemon.sprites.other.dream_world.front_default}`,
            // imageUrl:  `${(img) ?  img : defaultImg}`,
            html: `
                ${pokemon.stats.map(data=>`
                <div>
                    <input 
                        type="range" 
                        value=${data.base_stat}
                        max="200" id="${data.stat.name}"/>
                    <label data-name=${data.stat.name}> 
                        <b>${data.base_stat}</b> 
                        ${data.stat.name}
                    </label>
                </div>
                `).join("")}   
            `,
            confirmButtonText: 'OK',
            cancelButtonText: 'Enviar',
            showCancelButton: true,
            showCloseButton: true,
            imageWidth: "80%",
            imageHeight: "80%",
        });

        // let sendMockAPI = document.querySelector("#swal2-html-container")
        // sendMockAPI.addEventListener("change", (e) =>{
        //     let changeStats = e.target.value
        //     let myLabel = e.target.nextElementSibling;
        //     console.group("Estadisticas",pokemon.name);
        //     console.log(changeStats,myLabel.dataset.name);
        //     console.groupEnd();
        // })

        const mostrarInfo = {}

        let hearHp = document.querySelector("#hp")
        hearHp.addEventListener("change", (e) =>{
            mostrarInfo.Hp = { estadistica: e.target.value};
        });

        let hearAttack = document.querySelector("#attack")
        hearAttack.addEventListener("change", (e) =>{
            mostrarInfo.Attack= { estadistica: e.target.value};
        });
        
        let hearDefense = document.querySelector("#defense")
        hearDefense.addEventListener("change", (e) =>{
            mostrarInfo.Defense= { estadistica: e.target.value};
        });

        let hearSpecialAttack = document.querySelector("#special-attack")
        hearSpecialAttack.addEventListener("change", (e) =>{
            mostrarInfo.SpecialAttack= { estadistica: e.target.value};
        });

        let hearSpecialDefense = document.querySelector("#special-defense")
        hearSpecialDefense.addEventListener("change", (e) =>{
            mostrarInfo.SpecialDefense= { estadistica: e.target.value};
        });

        let hearSpeed = document.querySelector("#speed")
        hearSpeed.addEventListener("change", (e) =>{
            mostrarInfo.Speed= { estadistica: e.target.value};
        });

        //mostrar Informacion
        let sendMockAPI = document.querySelector(".swal2-styled.swal2-cancel")
        sendMockAPI.addEventListener("click", (e) =>{
            console.group("Estadisticas",pokemon.name);
            console.log(mostrarInfo);
            console.groupEnd();
        })

        //La idea es escuchar los cambios sin enviarlos y guardarlos en un array
        //Luego cuando le de enviar, mostrar un console.log con el grupo y que muestre todas las estadisticas que se cambiaron.
    })

    // Añadir elementos a Card

    card.appendChild(imgContainerPokemon);
    card.appendChild(name);

    pokemonContainer.appendChild(card);

}
showPokemon(100);