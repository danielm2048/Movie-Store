const User = require("../models/users.model");
const Wishlist = require("../models/wishlist.model");

const { getAdminId } = require("../middleware/authMiddleware");

const getWishers = async (_, args, { req }) => {
	getAdminId(req);

	const list = await Wishlist.find({ movieId: args.movieId, active: true });
	const users = await User.find({
		_id: { $in: list.map((item) => mongoose.Types.ObjectId(item.userId)) },
	});
	return users;
};

module.exports = {
	getWishers,
};
