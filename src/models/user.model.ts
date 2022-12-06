import { createModel } from "../configs/db";

import { Schema } from "mongoose";

type TUser = {
  login: string;
  name: string;
  password: string;
  isAdmin: boolean;
  reviews: string[];
};

const User = createModel("User", {
  login: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  isAdmin: { type: Boolean, required: true },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export default User;
