import { IMove } from "./move";
import { movesModel } from "./movesModel";
export const getAllMoves = async () => {
  try {
    const allMoves = await movesModel.find();

    if (!allMoves) {
      return "Move not found";
    } else {
      return allMoves;
    }
  } catch (error) {
    return error;
  }
};

export const createMove = async (move: IMove) => {
  try {
    const movesList = await movesModel.find();

    const duplicatedMove = movesList.find((move) => move.name === move.name);

    if (duplicatedMove) {
      return "Move already exists";
    } else {
      const createdMove = await movesModel.create(move);
      console.log("createdMove", await movesModel.create(move));
      return createdMove;
    }
  } catch (error) {
    return error;
  }
};

export const updateMove = async (id: string, move: IMove) => {
  try {
    const updatedMove = await movesModel.findByIdAndUpdate(id, move);
    if (!updatedMove) {
      return "Move not found";
    }
    return updatedMove;
  } catch (error) {
    return error;
  }
};

export const deleteMove = async (id: string) => {
  try {
    const deletedMove = await movesModel.findByIdAndDelete(id);
    if (!deletedMove) {
      return "Move not found";
    }
    return deletedMove;
  } catch (error) {
    return error;
  }
};

export const getOneMove = async (id: string) => {
  try {
    const oneMove = await movesModel.findById(id);
    if (!oneMove) {
      return "Move not found";
    }
    return oneMove;
  } catch (error) {
    return error;
  }
};
