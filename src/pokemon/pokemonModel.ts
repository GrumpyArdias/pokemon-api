import { IPokemon } from "./pokemon.d";
import mongoose from "mongoose";

export const pokemonSchema = new mongoose.Schema<IPokemon>({
  level: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ],
    required: true,
  },
  actualPS: {
    type: Number,
    required: true,
  },
  maxPs: {
    type: Number,
    required: true,
  },
  baseAttack: {
    type: Number,
    required: true,
  },
  baseDefense: {
    type: Number,
    required: true,
  },
  baseSpecialAttack: {
    type: Number,
    required: true,
  },
  baseSpecialDefense: {
    type: Number,
    required: true,
  },
  baseSpeed: {
    type: Number,
    required: true,
  },
  movements: {
    type: [String],
    validate: {
      validator: function (arr: string[]) {
        return arr.length <= 4;
      },
      message: "The Pokemon can only have 4 movements.",
    },
  },
});

export const pokemonModel = mongoose.model("Pokemon", pokemonSchema);
