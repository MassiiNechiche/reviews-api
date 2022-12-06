import { Router } from "express";
import {
  createUser,
  getEmployees,
  login,
} from "../controllers/user.controller";

const router = Router();

router.post("/create", createUser);

router.get("/employee", getEmployees);

router.post("/auth", login);

export default router;
