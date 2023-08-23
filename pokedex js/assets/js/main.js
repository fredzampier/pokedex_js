const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
const maxRecords = 151
let offset = 0

function convertPokemonToHtml (pokemon) {
    return `<li class="pokemon ${pokemon.type}" >
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.nome}</span>
    
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.nome}">
    </div>
    
</li>
    `
}

pokeApi.getPokemons().then((pokemons = []) => {
        
        const newHtml = pokemons.map(convertPokemonToHtml).join(``)
        pokemonList.innerHTML = newHtml

        //for (let i = 0; i < pokemons.length; i++) {
          //  const pokemon = pokemons [i]
            //listItems.push(convertPokemonToHtml(pokemon))
         // }

    })
 
    
function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        const newHtml = pokemons.map(convertPokemonToHtml).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadMoreButton.addEventListener('click', () => {
    offset += limit 
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
    
})