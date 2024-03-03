const { Schema, model } = require("mongoose");
const Joi = require("joi");

const themeVariants = ["violet", "light", "dark"];

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "User must have a name"],
        },
        password: {
            type: String,
            required: [true, "Set password for user"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        token: String,
        avatarURL: String,
        theme: {
            type: String,
            enum: themeVariants,
            default: "light",
        },
    },
    { versionKey: false }
);

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
});

const updateSchema = Joi.object({
    name: Joi.string().min(2).max(32),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(32),
});

const updateTheme = Joi.object({
    theme: Joi.string().valid(...themeVariants),
})

const schemas = { registerSchema, updateSchema, loginSchema, updateTheme };

const User = model("user", userSchema);

module.exports = { User, schemas };
