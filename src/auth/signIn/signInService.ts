import { IUser } from "./user";
import { ErrorWithStatus } from "../../config/ErrorWithStatus";
import { userModel } from "./signInModel";

export const createUser = async (user: IUser) => {
  try {
    const createdUser = await userModel.create(user);
    return createdUser;
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus(404, "User not found");
  }
};

export const getAllUsers = async () => {
  const allUsers = await userModel.find();
  if (!allUsers) {
    throw new ErrorWithStatus(404, "User not found");
  }
  return allUsers;
};

export const getOneUser = async (id: string) => {
  const oneUser = await userModel.findById(id);
  if (!oneUser) {
    throw new ErrorWithStatus(404, "User not found");
  }
  return oneUser;
};

export const updateUser = async (id: string, user: IUser) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, user);
  if (!updatedUser) {
    throw new ErrorWithStatus(404, "User not found");
  }
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await userModel.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new ErrorWithStatus(404, "User not found");
  }
  return deletedUser;
};
