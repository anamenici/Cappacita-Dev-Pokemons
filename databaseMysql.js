const { databaseConnection } = require('./connection')

const pokemons = {}

async function salvarPokemons(pokemon) {
    
    const queryInsertPokemon = `INSERT INTO pokemons_table(nome, tipo) VALUES ('${pokemon.nome}', '${pokemon.tipo}')`

    const result = await databaseConnection.raw(queryInsertPokemon)
    
    if(result) {
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            id: result[0].insertId
        }
    }else{
        console.error("Deu erro!")
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon(id) {

    const querySelectPokemon = `SELECT * FROM pokemons_table WHERE id = ${id}`

    const result = await databaseConnection.raw(querySelectPokemon)

    return result[0]
}

async function deletarPokemons() {
    const querySelectPokemon = `SELECT * FROM pokemons_table`

    const result = await databaseConnection.raw(querySelectPokemon)
    
    return result[0]
}

module.exports = { salvarPokemons, mostrarPokemon, mostrarPokemons }
