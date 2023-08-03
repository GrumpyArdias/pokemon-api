import { ICombat } from "./combat.d";

import mongoose from "mongoose";

export const combatSchema = new mongoose.Schema<ICombat>({
  user: {
    type: String,
    required: true,
  },
  firstPokemon: {
    type: String,
    required: true,
  },
  secondPokemon: {
    type: String,
    required: true,
  },
  firstPokemonAttack: {
    type: String,
    required: true,
  },
  secondPokemonAttack: {
    type: String,
    required: true,
  },
  firstPokemonCurrentHp: {
    type: Number,
    required: true,
  },
  secondPokemonCurrentHp: {
    type: Number,
    required: true,
  },
  thereIsAWinner: {
    type: Boolean,
    required: true,
  },
});

export const combatModel = mongoose.model<ICombat>("combat", combatSchema);
