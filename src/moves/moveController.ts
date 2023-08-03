import express from "express";
import { ErrorWithStatus } from "../utils/ErrorWithStatus";
import {
  createMove as createMoveService,
  getAllMoves as getAllMovesService,
  getOneMove as getOneMoveService,
  updateMove as updateMoveService,
  deleteMove as deleteMoveService,
  moveWithPokemon as moveWithPokemonService,
} from "./moveService";

export const createMove = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newMove = {
      name: req.body.name,
      type: req.body.type,
      power: req.body.power,
    };
    const createdMove = await createMoveService(newMove);
    return res.status(201).send(createdMove);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getAllMoves = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allMoves = await getAllMovesService();
    if (!allMoves) {
      return res.status(404).send("There are no moves");
    }
    return res.status(200).send(allMoves);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getOneMove = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getOneMove = await getOneMoveService(req.params.id);
    if (!getOneMove) {
      return res.status(404).send("Move not found");
    }
    return res.status(200).send(getOneMove);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const updateMove = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedMove = await updateMoveService(req.params.id, req.body);
    if (!updatedMove) {
      return res.status(404).send("Move not found");
    }
    return res.status(200).send(updatedMove);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const deleteMove = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedMove = await deleteMoveService(req.params.id);
    if (!deletedMove) {
      return res.status(404).send("Move not found");
    }
    return res.status(200).send(deletedMove);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const moveWithPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const moveWithPokemon = await moveWithPokemonService(req.params.id);
    if (!moveWithPokemon) {
      return res.status(404).send("Move not found");
    }
    return res.status(200).send(moveWithPokemon);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
