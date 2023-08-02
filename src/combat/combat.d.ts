import { IMove } from "../moves/move";
import { IPokemon } from "../pokemon/pokemon";

export interface IRound {
  roundNumber: number;
  firstPokemonAttack: IMove;
  secondPokemonAttack: IMove;
  firstPokemonActualHp: number;
  secondPokemonActualHp: number;
}

export interface ICombat {
  user: string;
  firstPokemon: IPokemon;
  secondPokemon: IPokemon;
  firstPokemonMove: IMove;
  secondPokemonMove: IMove;
  round: [IRound];
}
