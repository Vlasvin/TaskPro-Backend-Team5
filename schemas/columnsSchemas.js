const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      //   maxLength: 30,
      trim: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Column = model("Column", columnSchema);

const createColumnSchema = Joi.object({
  title: Joi.string().required(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string(),
});

const schemas = {
  createColumnSchema,
  updateColumnSchema,
};

module.exports = {
  schemas,
  Column,
};
