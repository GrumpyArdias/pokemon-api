import express from "express";
import {
  createMove,
  getAllMoves,
  getOneMove,
  updateMove,
  deleteMove,
} from "./moveController";

const router = express.Router();

router.get("/", getAllMoves);
router.get("/:id", getOneMove);
router.post("/", createMove);
router.put("/:id", updateMove);
router.delete("/:id", deleteMove);

export default router;
