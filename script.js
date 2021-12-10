// **** VARIABLES ****
// ===================

// Button ton validate input & show Pokemon
const btnViewPoke = document.querySelector('.btn-input-pokemon')

// Buttons to navigate between pokemon 
const pokePlus = document.querySelector('.pokeplus')
const pokeMoin = document.querySelector('.pokemoins')

// Container slider Pokemon
const sliderPokemon = document.querySelector('.slider-pokemon')

// Div to show pokemon
const pokemonDiv = document.querySelector('.insert-pokemon')

// Id Pokemon
let idPoke


// **** FONCTIONS ****
// ===================

// RÉCUPÉRATION DE POKEMON
function showPokemon() {

    // Show div pokemon
    sliderPokemon.style = 'display: block;'


    let apiPoke = {
        url : 'https://pokeapi.co/api/v2/',
        type :  'pokemon',
        id : idPoke
    }
    
    let {url, type, id} = apiPoke
    let apiUrl = `${url}${type}/${id}`

    if (apiPoke.id > 898) {
        pokemonDiv.innerHTML = `LE POKEMON ${apiPoke.id} N'EXISTE PAS`
    } else {

        
        let error = new Promise((resolve, reject) => {
            pokemonDiv.innerHTML = `LE POKEMON ${apiPoke.id} N'EXISTE PAS`;
        });
        

        fetch(apiUrl)
        // .catch( (error) => {
        //     console.log('error');
        // })
        .then( (data) => data.json())
        .then( (pokemon) => generateHtml(pokemon))
        // .catch(error => alert("Erreur : " + error));
        
        // .then( (data) => console.log(data.status))
        // console.log(apiUrl.data);
        // console.log(idPoke);




    }
}


// VÉRIFICATION DE TYPE
function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}


// **** EVENTS ****
// ================

// ÉVENEMENTS DE SÉLÉCTION DE POKEMON
btnViewPoke.addEventListener('click', () => {

    idPoke = document.querySelector('.input-pokemon').value

    if (idPoke == "") {
        sliderPokemon.style = 'display: block;'
        pokemonDiv.innerHTML = "MERCI D'ENTRER UNE VALEUR"
    } else{
        if (isNumber(idPoke)) {
            idPoke = parseInt(idPoke)
            showPokemon()
        } else {
            idPoke = idPoke.toLowerCase()
            console.log(idPoke);
            showPokemon()
        }
    } 
})

pokePlus.addEventListener('click', () =>{
    idPoke = idPoke + 1
    showPokemon()
})
pokeMoin.addEventListener('click', () =>{
    idPoke = idPoke - 1
    showPokemon()
})


// **** INSERT ****
// ================

// INSERTION DE MON POKEMON DANS LE HTML
const generateHtml = (pokeToInsert) => {

    const html = `
    <div class="name">${pokeToInsert.name}</div>
    <img src=${pokeToInsert.sprites.front_default}>
    <div class="details">
        <span>Height: ${pokeToInsert.height}</span>
        <span>Weight: ${pokeToInsert.weight}</span>
    </div>`

    pokemonDiv.innerHTML = html
}