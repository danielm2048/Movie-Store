const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
	{
		token: { type: String, required: true, unique: true },
		userId: { type: String, required: true, unique: true },
	},
	{
		timestamps: true,
	}
);

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
