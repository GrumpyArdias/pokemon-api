import { ICombat } from "./combat";
import { combatModel } from "./combatModel";
export const createCombat = async (combat: ICombat) => {
  try {
    const createdCombat = await combatModel.create(combat);
    return createdCombat;
  } catch (error) {
    return error;
  }
};

export const getOneCombat = async (id: string) => {
  try {
    const oneCombat = await combatModel.findById(id);
    if (!oneCombat) {
      return "Combat not found";
    }
    return oneCombat;
  } catch (error) {
    return error;
  }
};

export const deleteCombat = async (id: string) => {
  try {
    const deletedCombat = await combatModel.findByIdAndDelete(id);
    if (!deletedCombat) {
      return "Combat not found";
    }
    return deletedCombat;
  } catch (error) {
    return error;
  }
};

export const updateCombat = async (id: string, combat: ICombat) => {
  try {
    const updatedCombat = await combatModel.findByIdAndUpdate(id, combat);
    if (!updatedCombat) {
      return "Combat not found";
    }
    return updatedCombat;
  } catch (error) {
    return error;
  }
};

export const getAllCombats = async () => {
  try {
    const allCombats = await combatModel.find();
    if (!allCombats) {
      return "Combat not found";
    } else {
      return allCombats;
    }
  } catch (error) {
    return error;
  }
};
