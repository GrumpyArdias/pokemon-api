import { IMove } from "../moves/move";
import { IPokemon } from "../pokemon/pokemon";
import { pokemonTypeTable } from "../pokemon/pokemonTypeTable";

export function combatLogic(
  pokemonA: IPokemon,
  pokemonB: IPokemon,
  moveA: IMove,
  moveB: IMove
) {
  const pokemonAType = pokemonA.type;
  const pokemonBType = pokemonB.type;

  const PokemonAEffectivity = pokemonTypeTable[pokemonAType][pokemonBType];
  const PokemonBEffectivity = pokemonTypeTable[pokemonBType][pokemonAType];

  const randomNumber = () => {
    const baseNumber = Math.floor(Math.random() * 16) + 85;
    return baseNumber;
  };

  const PokemonADamage = Math.ceil(
    (((((2 * pokemonA.level) / 5 + 2) * pokemonA.baseAttack * moveA.power) /
      pokemonB.baseDefense /
      50) *
      PokemonAEffectivity *
      randomNumber()) /
      100
  );

  const PokemonBDamage = Math.ceil(
    (((((2 * pokemonB.level) / 5 + 2) * pokemonB.baseAttack * moveB.power) /
      pokemonA.baseDefense /
      50) *
      PokemonBEffectivity *
      randomNumber()) /
      100
  );

  return {
    PokemonADamage,
    PokemonBDamage,
  };
}
