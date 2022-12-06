import { Request, Response } from "express";

import Review from "../models/review.model";

const reviews = (req: Request, res: Response): void => {
  try {
    Review.find({ created_at: new Date() })
      .populate({ path: "owner" })
      .exec((err: any, reviews: any) => {
        if (err) res.status(400).json({ message: err });
        res.status(200).json(reviews);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const createReview = (req: Request, res: Response): void => {
  let { rate, message, owner } = req.body;
  try {
    Review.create(
      {
        rate,
        message,
        owner,
      },
      (err: any, review: any) => {
        if (err) res.status(400).json({ message: err });
        res.status(200).json({ review });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export { reviews, createReview };
