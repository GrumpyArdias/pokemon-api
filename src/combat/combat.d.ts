import { IMove } from "../moves/move";
import { IPokemon } from "../pokemon/pokemon";

export interface ICombat {
  user: string;
  firstPokemon: String;
  secondPokemon: String;
  thereIsAWinner: boolean;
  firstPokemonAttack: String;
  secondPokemonAttack: String;
  firstPokemonCurrentHp: number;
  secondPokemonCurrentHp: number;
}
