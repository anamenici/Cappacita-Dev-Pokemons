const { databaseConnection } = require('./connection')

const pokemons = {}

async function salvarPokemons(pokemon) {
    
    const insertPokemon = {
        nome: pokemon.nome,
        tipo: pokemon.tipo,
        local_origem: pokemon.origem
    }
    
        const result = await databaseConnection('pokemons_table').insert(insertPokemon)

        if(result) {
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            origem: pokemon.origem,
            id: result[0]
        }
    }else{
        console.error("Deu erro!")
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon(id) {

    const result = await databaseConnection('pokemons_table').where({ id })
    
    return result[0]
}

async function mostrarPokemons() {
    
    const result = await databaseConnection('pokemons_table')

    return result
}

async function alterarPokemon(id, pokemon) {
    
    const updatePokemon = {
        nome: pokemon.nome,
        tipo: pokemon.tipo,
        local_origem: pokemon.origem
    }
    
    const result = await databaseConnection('pokemons_table').where({ id }).update(updatePokemon)

    if(result) {
        return {
            ...pokemon,
            id
        }
    }else{
        console.error("Deu erro!")
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function deletarPokemon(id) {

    const result = await databaseConnection('pokemons_table').where({ id }).del()
    
    return result[0]
}

module.exports = { salvarPokemons, mostrarPokemon, mostrarPokemons, alterarPokemon, deletarPokemon }
