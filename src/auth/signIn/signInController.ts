import express from "express";
import {
  createUser as createUserService,
  getAllUsers as getAllUsersService,
  getOneUser as getOneUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "./signInService";
import { ErrorWithStatus } from "../../config/ErrorWithStatus";

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const createdUser = await createUserService(req.body);
    return res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getAllUsers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allUsers = await getAllUsersService();
    if (!allUsers) {
      return res.status(404).send("Users not found");
    }
    return res.status(200).json(allUsers);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getOneUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const oneUser = await getOneUserService(req.params.id);
    if (!oneUser) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(oneUser);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(deletedUser);
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
