import express from "express";
import { ErrorWithStatus } from "../utils/ErrorWithStatus";
import {
  createPokemon as createPokemonService,
  deletePokemon as deletePokemonService,
  getAllPokemons as getAllPokemonsService,
  updatePokemon as updatePokemonService,
  getOnePokemon as getOnePokemonService,
  getAllMovesFromPokemon as getAllMovesFromPokemonService,
} from "./pokemonService";

export const getAllPokemons = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const getAllPokemons = await getAllPokemonsService();
    if (!getAllPokemons) {
      return res.status(404).send("There are no pokemons");
    }
    return res.status(200).send(getAllPokemons);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const createPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newPokemon = {
      level: req.body.level,
      name: req.body.name,
      type: req.body.type,
      actualPS: req.body.actualPS,
      maxPs: req.body.maxPs,
      baseAttack: req.body.baseAttack,
      baseDefense: req.body.baseDefense,
      baseSpecialAttack: req.body.baseSpecialAttack,
      baseSpecialDefense: req.body.baseSpecialDefense,
      baseSpeed: req.body.baseSpeed,
      movements: req.body.movements,
    };

    const createdPokemon = await createPokemonService(newPokemon);
    return res.status(201).send(createdPokemon);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getOnePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getOnePokemon = await getOnePokemonService(req.params.id);
    if (!getOnePokemon) {
      return res.status(404).send("Pokemon not found");
    }
    return res.status(200).send(getOnePokemon);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const updatePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedPokemon = await updatePokemonService(req.params.id, req.body);
    if (!updatedPokemon) {
      return res.status(404).send("Pokemon not found");
    }
    return res.status(200).send(updatedPokemon);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const deletePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedPokemon = await deletePokemonService(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).send("Pokemon not found");
    }
    return res.status(200).send(deletedPokemon);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getAllMovesFromPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getAllMovesFromPokemon = await getAllMovesFromPokemonService(
      req.params.id
    );
    if (!getAllMovesFromPokemon) {
      return res.status(404).send("Pokemon not found");
    }
    return res.status(200).send(getAllMovesFromPokemon);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
