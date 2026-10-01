import * as userService from "./user.service.js";
import { successRes } from "../../utils/success.res.js";

export const signup = async (req, res) => {
  const user = await userService.signupService(req.body);
  return successRes({
    res,
    status: 201,
    msg: "User added successfully.",
    data: { user },
  });
};

export const login = async (req, res) => {
  const user = await userService.loginService(req.body);
  return successRes({
    res,
    status: 200,
    msg: "Login successful",
    data: { user },
  });
};

export const updateUser = async (req, res) => {
  const id = req.params.id || req.query.id;
  const user = await userService.updateUserService(id, req.body);
  return successRes({
    res,
    status: 200,
    msg: "User updated",
    data: { user },
  });
};

export const deleteUser = async (req, res) => {
  const id = req.params.id || req.query.id;
  const user = await userService.deleteUserService(id);
  return successRes({
    res,
    status: 200,
    msg: "user deleted",
    data: { user },
  });
};

export const getUserById = async (req, res) => {
  const id = req.params.id || req.query.id;
  const user = await userService.getUserByIdService(id);
  return successRes({
    res,
    status: 200,
    msg: "done",
    data: { user },
  });
};