import { IMove } from "./move";
import mongoose from "mongoose";

export const moveSchema = new mongoose.Schema<IMove>({
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
  power: {
    type: Number,
    required: true,
  },
});

export const movesModel = mongoose.model<IMove>("moves", moveSchema);
