import { UserModel } from "../../DB/Models/user.model.js";

export const signupService = async (body) => {
  const { name, email, password, phone, age } = body;
  const isExist = await UserModel.findOne({ email });
  if (isExist) {
    return { status: 409, data: { message: "Email already exists." } };
  }

  const newUser = await UserModel.create({ name, email, password, phone, age });
  return { status: 201, data: { message: "User added successfully.", user: newUser } };
};

export const loginService = async (body) => {
  const { email, password } = body;
  const user = await UserModel.findOne({ email, password });
  if (!user) {
    return { status: 400, data: { message: "Invalid email or password" } };
  }
  return { status: 200, data: { message: "Login successful", user } };
};

export const updateUserService = async (userId, body) => {
  const { name, email, phone, age } = body;

  const user = await UserModel.findById(userId);
  if (!user) {
    return { status: 404, data: { message: "User not found" } };
  }

  if (email && email !== user.email) {
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return { status: 409, data: { message: "Email already exists" } };
    }
    user.email = email;
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (age) user.age = age;

  await user.save();
  return { status: 200, data: { message: "User updated", user } };
};

export const deleteUserService = async (userId) => {
  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) {
    return { status: 404, data: { message: "User not found" } };
  }
  return { status: 200, data: { message: "user deleted" } };
};

export const getUserByIdService = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return { status: 404, data: { message: "User not found" } };
  }
  return { status: 200, data: user };
};