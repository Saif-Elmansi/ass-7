import { UserModel } from "../../DB/Models/user.model.js";
import { errorRes } from "../../utils/error.res.js";

export const signupService = async (body) => {
  const { name, email, password, phone, age } = body;
  const isExist = await UserModel.findOne({ email });
  if (isExist) {
    errorRes({ msg: "Email already exists.", statusCode: 409 });
  }

  const newUser = await UserModel.create({ name, email, password, phone, age });
  return newUser;
};

export const loginService = async (body) => {
  const { email, password } = body;
  const user = await UserModel.findOne({ email, password });
  if (!user) {
    errorRes({ msg: "Invalid email or password", statusCode: 400 });
  }
  return user;
};

export const updateUserService = async (userId, body) => {
  const { name, email, phone, age } = body;

  const user = await UserModel.findById(userId);
  if (!user) {
    errorRes({ msg: "User not found", statusCode: 404 });
  }

  if (email && email !== user.email) {
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      errorRes({ msg: "Email already exists", statusCode: 409 });
    }
    user.email = email;
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (age) user.age = age;

  await user.save();
  return user;
};

export const deleteUserService = async (userId) => {
  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) {
    errorRes({ msg: "User not found", statusCode: 404 });
  }
  return user;
};

export const getUserByIdService = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    errorRes({ msg: "User not found", statusCode: 404 });
  }
  return user;
};