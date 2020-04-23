const jwt = require("jsonwebtoken");
const { ACCESS_SECRET } = require("../constants");

const getUserId = (req, res) => {
	const Authorization = req.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("Bearer ", "");
		const { userId } = jwt.verify(token, ACCESS_SECRET);
		return userId;
	}

	throw new Error("Not authenticated");
};

const getAdminId = (req, res) => {
	const Authorization = req.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("Bearer ", "");
		const { userId, role } = jwt.verify(token, ACCESS_SECRET);
		if (role === "ADMIN") return userId;
		throw new Error("Not authorized");
	}

	throw new Error("Not authorized");
};

module.exports = { getUserId, getAdminId };
