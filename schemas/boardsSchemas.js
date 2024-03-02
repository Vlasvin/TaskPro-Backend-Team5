const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      //   maxLength: 30,
      trim: true,
    },
    iconsURL: String,
    backgroundURL: String,
    owner: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Board = model("Board", boardSchema);

const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  iconsURL: Joi.string(),
  backgroundURL: Joi.string(),
  // iconsURL: Joi.string().required(),
  // backgroundURL: Joi.string().required(),
});

const updateBoardSchema = Joi.object({
  title: Joi.string(),
  iconsURL: Joi.string(),
  backgroundURL: Joi.string(),
});

const schemas = {
  createBoardSchema,
  updateBoardSchema,
};

module.exports = {
  schemas,
  Board,
};
