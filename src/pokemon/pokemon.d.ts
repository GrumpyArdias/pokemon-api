import { pokemonTypeTable } from "../pokemon/pokemonTypeTable";
export interface IPokemon {
  level: number;
  name: string;
  type: keyof typeof pokemonTypeTable;
  actualPS: number;
  maxPs: number;
  baseAttack: number;
  baseDefense: number;
  baseSpecialAttack: number;
  baseSpecialDefense: number;
  baseSpeed: number;
  movements: string[];
}
