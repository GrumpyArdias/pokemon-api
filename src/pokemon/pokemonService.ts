import { pokemonModel } from "./pokemonModel";
import { IPokemon } from "./pokemon.d";
import { movesModel } from "../moves/movesModel";
import { ErrorWithStatus } from "../config/ErrorWithStatus";

export const getAllPokemons = async () => {
  const allPokemons = await pokemonModel.find();
  if (!allPokemons) {
    throw new ErrorWithStatus(404, "Pokemon not found");
  }
  return allPokemons;
};

export const getOnePokemon = async (id: string) => {
  const onePokemon = await pokemonModel.findById(id);
  if (!onePokemon) {
    throw new ErrorWithStatus(404, "Pokemon not found");
  }
  return onePokemon;
};

export const createPokemon = async (pokemon: IPokemon) => {
  const duplicatedPokemon = await pokemonModel.find({ name: pokemon.name });

  if (duplicatedPokemon.length > 0) {
    throw new ErrorWithStatus(404, "Pokemon already exists");
  } else if (!Object.values(pokemon).includes(pokemon.type)) {
    throw new ErrorWithStatus(400, "invalid Pokemon type");
  }

  const createdPokemon = await pokemonModel.create(pokemon);
  return createdPokemon;
};

export const updatePokemon = async (id: string, pokemon: IPokemon) => {
  const updatedPokemon = await pokemonModel.findByIdAndUpdate(id, pokemon);
  if (!updatedPokemon) {
    throw new ErrorWithStatus(404, "Pokemon not found");
  }
  return updatedPokemon;
};

export const deletePokemon = async (id: string) => {
  const deletedPokemon = await pokemonModel.findByIdAndDelete(id);
  if (!deletedPokemon) {
    throw new ErrorWithStatus(404, "Pokemon not found");
  }
  return deletedPokemon;
};

export const getAllMovesFromPokemon = async (id: string) => {
  const pokemon = await pokemonModel.findById(id);
  if (!pokemon) {
    throw new ErrorWithStatus(404, "Pokemon not found");
  }
  const relatedMoves = await movesModel.find({
    type: pokemon.type,
  });
  if (!relatedMoves) {
    throw new ErrorWithStatus(404, "Not Pokemon can use this move");
  }
  return relatedMoves;
};
