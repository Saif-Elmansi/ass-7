import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.patch("/:id", userController.updateUser);
router.delete("/", userController.deleteUser);
router.get("/", userController.getUserById);

export default router;