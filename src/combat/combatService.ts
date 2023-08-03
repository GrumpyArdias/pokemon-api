import { ICombat } from "./combat";
import { combatModel } from "./combatModel";
import { combatLogic } from "../utils/combatLogic";
import { pokemonModel } from "../pokemon/pokemonModel";
import { movesModel } from "../moves/movesModel";
import { IPokemon } from "../pokemon/pokemon";
import { IMove } from "../moves/move";
import { ErrorWithStatus } from "../utils/ErrorWithStatus";
export const createCombat = async (combat: ICombat) => {
  try {
    const createdCombat = await combatModel.create(combat);
    return createdCombat;
  } catch (error) {
    throw new ErrorWithStatus(404, "Combat not found");
  }
};

export const getOneCombat = async (id: string) => {
  const oneCombat = await combatModel.findById(id);
  if (!oneCombat) {
    throw new ErrorWithStatus(404, "Combat not found");
  }
  return oneCombat;
};

export const deleteCombat = async (id: string) => {
  const deletedCombat = await combatModel.findByIdAndDelete(id);
  if (!deletedCombat) {
    throw new ErrorWithStatus(404, "Combat not found");
  }
  return deletedCombat;
};

export const updateCombat = async (id: string, combat: ICombat) => {
  // Retrieve the existing combat record from the database
  const findCombat = await combatModel.findById(id);

  // Find the corresponding Pokemon records based on the names provided in the combat object
  const pokemonA = await pokemonModel.findOne({
    name: combat.firstPokemon,
  } as IPokemon);
  const pokemonB = await pokemonModel.findOne({
    name: combat.secondPokemon,
  } as IPokemon);

  // Find the corresponding move records based on the names provided in the combat object
  const pokemonAMove = await movesModel.findOne({
    name: combat.firstPokemonAttack,
  } as IMove);
  const pokemonBMove = await movesModel.findOne({
    name: combat.secondPokemonAttack,
  } as IMove);

  // Check if the combat record is found in the database
  if (!findCombat) {
    throw new ErrorWithStatus(404, "Combat not found");
  }

  // Check if the combat has already finished
  if (findCombat.thereIsAWinner) {
    throw new ErrorWithStatus(403, "Combat already finished");
  }

  // Check if all the required Pokemon and move records are found
  if (pokemonA && pokemonB && pokemonAMove && pokemonBMove) {
    // Check if the types of the Pokemon and their respective moves match
    if (pokemonA.type !== pokemonAMove.type) {
      return `the movement of ${pokemonA.name} is not allowed`;
    } else if (pokemonB.type !== pokemonBMove.type) {
      return `the movement of ${pokemonB.name} is not allowed`;
    }

    // Calculate the damage inflicted by each Pokemon's move
    const roundDamage = combatLogic(
      pokemonA,
      pokemonB,
      pokemonAMove,
      pokemonBMove
    );

    // Update the current HP of each Pokemon based on the calculated damage
    const firstPokemonCurrentHp =
      combat.firstPokemonCurrentHp - roundDamage.PokemonBDamage;
    const secondPokemonCurrentHp =
      combat.secondPokemonCurrentHp - roundDamage.PokemonADamage;

    console.log(firstPokemonCurrentHp, secondPokemonCurrentHp);
    // Check if the first Pokemon's HP reaches or falls below 0
    if (firstPokemonCurrentHp <= 0) {
      // Update the combat record with the new HP values and set thereIsAWinner to true
      await combatModel.findByIdAndUpdate(id, {
        ...combat,
        firstPokemonCurrentHp,
        secondPokemonCurrentHp,
        thereIsAWinner: true,
      });

      return `Combat finished ${pokemonB.name} wins`;
    }

    // Check if the second Pokemon's HP reaches or falls below 0
    if (secondPokemonCurrentHp <= 0) {
      // Update the combat record with the new HP values and set thereIsAWinner to true
      await combatModel.findByIdAndUpdate(id, {
        ...combat,
        firstPokemonCurrentHp,
        secondPokemonCurrentHp,
        thereIsAWinner: true,
      });

      return `Combat finished ${pokemonA.name} wins`;
    }

    // Update the combat record with the new HP values
    await combatModel.findByIdAndUpdate(id, {
      ...combat,
      firstPokemonCurrentHp,
      secondPokemonCurrentHp,
    });

    const updatedCombat = await combatModel.findById(id);

    return updatedCombat;
  }

  // Throw an error if any of the required Pokemon or move records are not found
  throw new ErrorWithStatus(404, "Pokemon or move not found");
};

export const getAllCombats = async () => {
  const allCombats = await combatModel.find();
  if (!allCombats) {
    throw new ErrorWithStatus(404, "Combat not found");
  }
  return allCombats;
};
