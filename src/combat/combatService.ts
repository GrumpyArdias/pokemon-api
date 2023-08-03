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
  const findCombat = await combatModel.findById(id);
  const pokemonA = await pokemonModel.findOne({
    name: combat.firstPokemon,
  } as IPokemon);
  const pokemonB = await pokemonModel.findOne({
    name: combat.secondPokemon,
  } as IPokemon);
  const pokemonAMove = await movesModel.findOne({
    name: combat.firstPokemonAttack,
  } as IMove);
  const pokemonBMove = await movesModel.findOne({
    name: combat.secondPokemonAttack,
  } as IMove);

  if (!findCombat) {
    throw new ErrorWithStatus(404, "Combat not found");
  }
  if (findCombat.thereIsAWinner) {
    throw new ErrorWithStatus(403, "Combat already finished");
  }
  if (pokemonA && pokemonB && pokemonAMove && pokemonBMove) {
    if (pokemonA.type !== pokemonAMove.type) {
      return `the movement of ${pokemonA.name}  is not allowed`;
    } else if (pokemonB.type !== pokemonBMove.type) {
      return `the movement of ${pokemonB.name}  is not allowed`;
    }

    const roundDamage = combatLogic(
      pokemonA,
      pokemonB,
      pokemonAMove,
      pokemonBMove
    );

    const firstPokemonCurrentHp =
      combat.firstPokemonCurrentHp - roundDamage.PokemonBDamage;
    const secondPokemonCurrentHp =
      combat.secondPokemonCurrentHp - roundDamage.PokemonADamage;

    if (firstPokemonCurrentHp <= 0) {
      await combatModel.findByIdAndUpdate(id, {
        ...combat,
        firstPokemonCurrentHp,
        secondPokemonCurrentHp,
        thereIsAWinner: true,
      });

      return `Combat finished ${pokemonB.name} wins`;
    }
    if (secondPokemonCurrentHp <= 0) {
      await combatModel.findByIdAndUpdate(id, {
        ...combat,
        firstPokemonCurrentHp,
        secondPokemonCurrentHp,
        thereIsAWinner: true,
      });
      return `Combat finished ${pokemonA.name} wins`;
    }
    const updatedCombat = await combatModel.findByIdAndUpdate(id, {
      ...combat,
      firstPokemonCurrentHp,
      secondPokemonCurrentHp,
    });
    return updatedCombat;
  }
  throw new ErrorWithStatus(404, "Pokemon or move not found");
};

export const getAllCombats = async () => {
  const allCombats = await combatModel.find();
  if (!allCombats) {
    throw new ErrorWithStatus(404, "Combat not found");
  }
  return allCombats;
};
