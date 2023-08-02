import express from "express";
import {
  createMove as createMoveService,
  getAllMoves as getAllMovesService,
  getOneMove as getOneMoveService,
  updateMove as updateMoveService,
  deleteMove as deleteMoveService,
} from "./moveService";

export const createMove = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("this is the req", req.body);
  try {
    console.log("this is the try");
    const newMove = {
      name: req.body.name,
      type: req.body.type,
      power: req.body.power,
    };
    const createdMove = await createMoveService(newMove);
    console.log("this is the createdMove", createdMove);
    res.status(201).send(createdMove);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllMoves = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allMoves = await getAllMovesService();
    if (!allMoves) {
      res.status(404).send("There are no moves");
    }
    console.log("this is the controller allMoves", allMoves);
    res.status(200).send(allMoves);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getOneMove = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getOneMove = await getOneMoveService(req.params.id);
    if (!getOneMove) {
      res.status(404).send("Move not found");
    }
    res.status(200).send(getOneMove);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateMove = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedMove = await updateMoveService(req.params.id, req.body);
    if (!updatedMove) {
      res.status(404).send("Move not found");
    }
    res.status(200).send(updatedMove);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteMove = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedMove = await deleteMoveService(req.params.id);
    if (!deletedMove) {
      res.status(404).send("Move not found");
    }
    res.status(200).send(deletedMove);
  } catch (error) {
    res.status(500).send(error);
  }
};
