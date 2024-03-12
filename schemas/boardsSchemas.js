const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    iconURL: String,
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
  iconURL: Joi.string(),
  backgroundURL: Joi.string(),
});

const updateBoardSchema = Joi.object({
  title: Joi.string(),
  iconURL: Joi.string(),
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
