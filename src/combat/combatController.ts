import express from "express";
import { ErrorWithStatus } from "../utils/ErrorWithStatus";
import {
  createCombat as createCombatService,
  getOneCombat as getOneCombatService,
  deleteCombat as deleteCombatService,
  updateCombat as updateCombatService,
  getAllCombats as getAllCombatsService,
} from "./combatService";

export const createCombat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const createdCombat = await createCombatService(req.body);
    return res.status(201).json(createdCombat);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getOneCombat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const oneCombat = await getOneCombatService(req.params.id);
    if (!oneCombat) {
      return res.status(404).json("Combat not found");
    }
    return res.status(200).json(oneCombat);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const deleteCombat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCombat = await deleteCombatService(req.params.id);
    if (!deletedCombat) {
      return res.status(404).json("Combat not found");
    }
    return res.status(200).json(deletedCombat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// This maybe the

export const updateCombat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedCombat = await updateCombatService(req.params.id, req.body);
    if (!updatedCombat) {
      return res.status(404).json("Combat not found");
    }
    return res.status(200).json(updatedCombat);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getAllCombats = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allCombats = await getAllCombatsService();
    if (!allCombats) {
      return res.status(404).json("Combat not found");
    }
    return res.status(200).json(allCombats);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
