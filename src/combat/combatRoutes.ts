import express from "express";
import {
  createCombat,
  getAllCombats,
  getOneCombat,
  updateCombat,
  deleteCombat,
} from "./combatController";

const router = express.Router();

router.get("/", getAllCombats);
router.get("/:id", getOneCombat);
router.post("/", createCombat);
router.put("/:id", updateCombat);
router.delete("/:id", deleteCombat);

export default router;
