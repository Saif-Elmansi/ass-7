import * as userService from "./user.service.js";

export const signup = async (req, res) => {
  try {
    const result = await userService.signupService(req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await userService.loginService(req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await userService.updateUserService(id, req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await userService.deleteUserService(id);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await userService.getUserByIdService(id);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};