import { pokemonModel } from "./pokemonModel";
import { IPokemon } from "./pokemon.d";

export const getAllPokemons = async () => {
  try {
    const allPokemons = await pokemonModel.find();
    if (!allPokemons) {
      return "Pokemon not found";
    }
    return allPokemons;
  } catch (error) {
    return error;
  }
};

export const getOnePokemon = async (id: string) => {
  try {
    const onePokemon = await pokemonModel.findById(id);
    if (!onePokemon) {
      return "Pokemon not found";
    }
    return onePokemon;
  } catch (error) {
    return error;
  }
};

export const createPokemon = async (pokemon: IPokemon) => {
  try {
    const pokemonList = await pokemonModel.find();

    const duplicatedPokemon = pokemonList.find(
      (pokemon) => pokemon.name === pokemon.name
    );

    if (duplicatedPokemon) {
      return "Pokemon already exists";
    } else {
      const createdPokemon = await pokemonModel.create(pokemon);
      return createdPokemon;
    }
  } catch (error) {
    return error;
  }
};

export const updatePokemon = async (id: string, pokemon: IPokemon) => {
  try {
    const updatedPokemon = await pokemonModel.findByIdAndUpdate(id, pokemon);
    if (!updatedPokemon) {
      return "Pokemon not found";
    }
    return updatedPokemon;
  } catch (error) {
    return error;
  }
};

export const deletePokemon = async (id: string) => {
  try {
    const deletedPokemon = await pokemonModel.findByIdAndDelete(id);
    if (!deletedPokemon) {
      return "Pokemon not found";
    }
    return deletedPokemon;
  } catch (error) {
    return error;
  }
};
