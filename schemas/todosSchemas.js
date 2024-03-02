const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      //   maxLength: 30,
      trim: true,
    },
    description: {
      type: String,
      //   maxLength: 300,
    },
    priority: {
      type: String,
      enum: ["Without priority", "Low", "Medium", "High"],
      default: "Without priority",
    },
    deadline: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: "Column",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Todo = model("Todo", todoSchema);

const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().required(),
  deadline: Joi.date().required(),
});

const updateTodoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string(),
  deadline: Joi.date(),
});

const updateCompletedSchema = Joi.object({
  completed: Joi.boolean(),
});

const schemas = {
  createTodoSchema,
  updateTodoSchema,
  updateCompletedSchema,
};

module.exports = {
  schemas,
  Todo,
};
