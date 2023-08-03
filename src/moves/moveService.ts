import { IMove } from "./move";
import { movesModel } from "./movesModel";
import { pokemonModel } from "../pokemon/pokemonModel";
import { ErrorWithStatus } from "../utils/ErrorWithStatus";
export const getAllMoves = async () => {
  const allMoves = await movesModel.find();

  if (!allMoves) {
    throw new ErrorWithStatus(404, "Move not found");
  }
  return allMoves;
};

export const createMove = async (move: IMove) => {
  const duplicatedMove = await movesModel.find({ name: move.name });

  if (duplicatedMove.length > 0) {
    throw new ErrorWithStatus(404, "Move not found");
  }
  const createdMove = await movesModel.create(move);
  return createdMove;
};

export const updateMove = async (id: string, move: IMove) => {
  const updatedMove = await movesModel.findByIdAndUpdate(id, move);
  if (!updatedMove) {
    throw new ErrorWithStatus(404, "Move not found");
  }

  if (!Object.values(move).includes(move.type)) {
    throw new ErrorWithStatus(400, "Invalid move type");
  }

  return updatedMove;
};

export const deleteMove = async (id: string) => {
  const deletedMove = await movesModel.findByIdAndDelete(id);
  if (!deletedMove) {
    throw new ErrorWithStatus(404, "Move not found");
  }
  return deletedMove;
};

export const getOneMove = async (id: string) => {
  const oneMove = await movesModel.findById(id);
  if (!oneMove) {
    throw new ErrorWithStatus(404, "Move not found");
  }
  return oneMove;
};

export const moveWithPokemon = async (id: string) => {
  const move = await movesModel.findById(id);
  console.log(move);
  if (!move) {
    throw new ErrorWithStatus(404, "Move not found");
  }
  const relatedPokemon = await pokemonModel.find({ type: move.type });
  if (!relatedPokemon) {
    throw new ErrorWithStatus(404, "Not Pokemon can use this move");
  }
  return relatedPokemon;
};
