import express from "express";

import {
  createPokemon as createPokemonService,
  deletePokemon as deletePokemonService,
  getAllPokemons as getAllPokemonsService,
  updatePokemon as updatePokemonService,
  getOnePokemon as getOnePokemonService,
} from "./pokemonService";

export const getAllPokemons = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const getAllPokemons = await getAllPokemonsService();
    if (!getAllPokemons) {
      res.status(404).send("There are no pokemons");
    }
    res.status(200).send(getAllPokemons);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(201).send(createdPokemon);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getOnePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("this is the try");
    const getOnePokemon = await getOnePokemonService(req.params.id);
    if (!getOnePokemon) {
      res.status(404).send("Pokemon not found");
    }
    res.status(200).send(getOnePokemon);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedPokemon = await updatePokemonService(req.params.id, req.body);
    if (!updatedPokemon) {
      res.status(404).send("Pokemon not found");
    }
    res.status(200).send(updatedPokemon);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deletePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedPokemon = await deletePokemonService(req.params.id);
    if (!deletedPokemon) {
      res.status(404).send("Pokemon not found");
    }
    res.status(200).send(deletedPokemon);
  } catch (error) {
    res.status(500).send(error);
  }
};
