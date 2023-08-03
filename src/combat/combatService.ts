import { ICombat } from "./combat";
import { combatModel } from "./combatModel";

import { combatLogic } from "../utils/combatLogic";
import { pokemonModel } from "../pokemon/pokemonModel";
import { movesModel } from "../moves/movesModel";
import { IPokemon } from "../pokemon/pokemon";
import { IMove } from "../moves/move";
export const createCombat = async (combat: ICombat) => {
  try {
    const createdCombat = await combatModel.create(combat);
    return createdCombat;
  } catch (error) {
    return error;
  }
};

export const getOneCombat = async (id: string) => {
  try {
    const oneCombat = await combatModel.findById(id);
    if (!oneCombat) {
      return "Combat not found";
    }
    return oneCombat;
  } catch (error) {
    return error;
  }
};

export const deleteCombat = async (id: string) => {
  try {
    const deletedCombat = await combatModel.findByIdAndDelete(id);
    if (!deletedCombat) {
      return "Combat not found";
    }
    return deletedCombat;
  } catch (error) {
    return error;
  }
};

export const updateCombat = async (id: string, combat: ICombat) => {
  try {
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
      return "Combat not found";
    }
    if (findCombat.thereIsAWinner === true) {
      return "Combat already finished";
    }
    if (pokemonA && pokemonB && pokemonAMove && pokemonBMove) {
      if (pokemonA.type !== pokemonAMove.type) {
        return `the movement of ${pokemonA.name} 1 is not allowed`;
      } else if (pokemonB.type !== pokemonBMove.type) {
        return `the movement of ${pokemonB.name}  2 is not allowed`;
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
    return "Pokemon or move not found";
  } catch (error) {
    return error;
  }
};

export const getAllCombats = async () => {
  try {
    const allCombats = await combatModel.find();
    if (!allCombats) {
      return "Combat not found";
    } else {
      return allCombats;
    }
  } catch (error) {
    return error;
  }
};
