import { ICombat } from "./combat.d";
import { IRound } from "./combat.d";
import mongoose from "mongoose";
import { pokemonSchema } from "../pokemon/pokemonModel";
import { moveSchema } from "../moves/movesModel";

export const roundSchema = new mongoose.Schema<IRound>({
  roundNumber: {
    type: Number,
  },
  firstPokemonAttack: {
    type: moveSchema,
    required: true,
  },
  secondPokemonAttack: {
    type: moveSchema,
    required: true,
  },
  firstPokemonActualHp: {
    type: Number,
  },
  secondPokemonActualHp: {
    type: Number,
  },
});

export const combatSchema = new mongoose.Schema<ICombat>({
  user: {
    type: String,
    required: true,
  },
  firstPokemon: {
    type: pokemonSchema,
    required: true,
  },
  secondPokemon: {
    type: pokemonSchema,
    required: true,
  },
  firstPokemonMove: {
    type: moveSchema,
    required: true,
  },
  secondPokemonMove: {
    type: moveSchema,
    required: true,
  },
  round: {
    type: [roundSchema],
    required: true,
  },
});

export const combatModel = mongoose.model<ICombat>("combat", combatSchema);
