import { createModel } from "../configs/db";

import { Schema } from "mongoose";

type TReview = {
  rate: string;
  message: string;
  owner: string;
};

const Review = createModel("Review", {
  rate: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default Review;
