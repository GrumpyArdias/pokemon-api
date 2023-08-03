import express from "express";

import {
  createPokemon,
  deletePokemon,
  getAllPokemons,
  updatePokemon,
  getOnePokemon,
  getAllMovesFromPokemon,
} from "./pokemonController";

const router = express.Router();

router.get("/", getAllPokemons);
router.get("/:id", getOnePokemon);
router.post("/", createPokemon);
router.put("/:id", updatePokemon);
router.delete("/:id", deletePokemon);
router.get("/move/:id", getAllMovesFromPokemon);

export default router;
