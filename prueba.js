const pokemonContainer = document.querySelector(".pokemonContainer")

function consulta(nombre){
    fetch(`https://650b10a4dfd73d1fab098284.mockapi.io/PokeDex?Pokemon=${nombre}`)
    .then(res => res.json())
    .then(data => console.log(data))
    }

function buscarNombres(){
    fetch(`https://650b10a4dfd73d1fab098284.mockapi.io/PokeDex`)
    .then(res => res.json())
    .then(data => traerNombres(data))
}

function traerNombres(nombrePokemon){
        // Lista para almacenar los valores
    let listaValores = [];

    // Recorrer el JSON y agregar los valores a la lista
    for (let i = 0; i < nombrePokemon.length; i++) {
        listaValores.push(nombrePokemon[i].Pokemon);
    }
    console.log(listaValores);
}

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

        // Subir Datos al API
        const mostrarInfo = {}

        mostrarInfo.Pokemon = pokemon.name;

        let hearHp = document.querySelector("#hp")
        hearHp.addEventListener("change", (e) =>{
            mostrarInfo.Hp = e.target.value;
        });

        let hearAttack = document.querySelector("#attack")
        hearAttack.addEventListener("change", (e) =>{
            mostrarInfo.Attack = e.target.value;
        });
        
        let hearDefense = document.querySelector("#defense")
        hearDefense.addEventListener("change", (e) =>{
            mostrarInfo.Defense = e.target.value
        });

        let hearSpecialAttack = document.querySelector("#special-attack")
        hearSpecialAttack.addEventListener("change", (e) =>{
            mostrarInfo.SpecialAttack = e.target.value;
        });

        let hearSpecialDefense = document.querySelector("#special-defense")
        hearSpecialDefense.addEventListener("change", (e) =>{
            mostrarInfo.SpecialDefense =e.target.value;
        });

        let hearSpeed = document.querySelector("#speed")
        hearSpeed.addEventListener("change", (e) =>{
            mostrarInfo.Speed = e.target.value;
        });

        //Enviar Informacion
        let sendMockAPI = document.querySelector(".swal2-styled.swal2-cancel")
        sendMockAPI.addEventListener("click", async (e) =>{
            console.group("Estadisticas",pokemon.name);
            console.log(mostrarInfo);
            console.groupEnd();

            const url = ' http://127.0.0.222:5002/profile';
            
                e.preventDefault();
                // Recibe el dato y se pasamos a Object Js para su lectura

                // peticion asincrona
                const res = await fetch(url);         
                console.log(res);

                const data = await res.json();
                console.log(data);

                let config = {
                    // metodo de poner o subir al API proveniente de la documentacion
                    method: "POST",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify(mostrarInfo),
                }
                const envio = await (await fetch(url,config)).json();
        });

        // Actualizar Estadisticas en tiempo real.
        let containerHtml = document.querySelector("#swal2-html-container")
        containerHtml.addEventListener("input", (e) =>{
            let myLabel = e.target.nextElementSibling;
            myLabel.innerHTML = `<b>${e.target.value}</b> ${myLabel.dataset.name}` 
            })
    })

// FUNCIONES
    // Añadir elementos a Card

    card.appendChild(imgContainerPokemon);
    card.appendChild(name);

    pokemonContainer.appendChild(card);
}


// consulta();
buscarNombres();
showPokemon(100);