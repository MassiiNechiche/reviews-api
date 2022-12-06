import { Request, Response } from "express";

const {
  hashPassword,
  verifyAuthenticationInformation,
} = require("../utils/auth");

import User from "../models/user.model";

interface TUser {
  login: string;
  name: string;
  position: string;
  password: string;
}

const createUser = async (req: Request, res: Response): Promise<void> => {
  let { login, name, position, password }: TUser = req.body;
  try {
    if (!login || !name || !password)
      res.status(400).json({
        message: "informations manquantes",
      });

    let hashed = await hashPassword(password);

    User.create(
      { login, name, password: hashed, position, isAdmin: false },
      (err: any, model: any) => {
        if (err) {
          res.status(400).json({
            message: "Erreur",
          });
        } else if (model) {
          res.status(200).json(model);
        } else res.status(400).json({ message: "Erreur dans la création" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getEmployees = (req: Request, res: Response): void => {
  try {
    User.find({})
      .populate("reviews")
      .exec((err: any, employees: any) => {
        if (err) return res.status(400).json({ message: err });
        res.status(200).json({ employees });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const login = (req: Request, res: Response): void => {
  let { login, password } = req.body;
  try {
    if (!login || !password)
      res.status(400).json({
        message: "informations manquantes",
      });
    else
      User.findOne({ login }, async (err: any, model: any): Promise<void> => {
        if (err) {
          res.status(400).json({
            message: "Erreur",
          });
        } else {
          let { token, user, error } = await verifyAuthenticationInformation(
            model,
            password
          );

          if (error)
            res.status(400).json({ message: "Password doesn't match !" });
          else res.status(200).json({ token, user });
        }
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export { createUser, getEmployees, login };
