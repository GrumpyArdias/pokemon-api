import { IMove } from "./move";
import { movesModel } from "./movesModel";
import { ErrorWithStatus } from "../utils/ErrorWithStatus";
export const getAllMoves = async () => {
  const allMoves = await movesModel.find();

  if (!allMoves) {
    throw new ErrorWithStatus(404, "Move not found");
  }
  return allMoves;
};

export const createMove = async (move: IMove) => {
  const movesList = await movesModel.find();

  const duplicatedMove = movesList.find((move) => move.name === move.name);

  if (duplicatedMove) {
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

// export const pokemonWithMove = async (id: string) => {
//   try{
//     const move = await movesModel.findById(id);
//     if(!move){
//       return "Move not found"
//     }
//     const

//   }
// }
