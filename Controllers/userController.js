const User = require("../models/user");
const { extractPaginationInfo } = require("../utils/pagination");

const getUsers = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  // the pagination options
  const options = {
    sort: { _id: -1 },
    lean: true,
    page,
    limit,
  };

  try {
    // get the users
    const users = await User.paginate(filter, options);
    // build the resulting object
    return res.status(200).send({ data: users, message: "Users retrieved successfully" });
  } catch (error) {
    return res.status(422).send({ data: {}, message: error.message });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ _id: id });
    // user not found
    if (!user)
      return res.status(404).send({ message: "User not found" });

    return res.status(200).send({ data: user, message: "User retrieved successfully" });
  } catch (error) {
    return res.status(422).send({ message: error.message });
  }
};

// const createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     return res.status(201).send({ data: user, message: "User created successfully" });
//   } catch (error) {
//     return res.status(422).send({ message: error.message });
//   }
// };

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findOneAndDelete({ _id: id });

    // user not found
    if (!deletedUser)
      return res.status(404).send({ message: "User not found" });

    // deleted
    return res.status(204).send({ data: {}, message: "User deleted successfully" });
  } catch (error) {
    // invalid params
    return res.status(422).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  let photo = "public/img/photos/default.png";
  
  if (req.file) {
    photo = req.file.destination + req.file.filename;
    updates.photo=photo;
  }
  
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    });

    // user not found
    if (!updatedUser)
      return res.status(404).send({ message: "User not found" });

    // updated
    return res.status(200).send({ data: updatedUser, message: "User updated successfully" });
  } catch (error) {
    // invalid params
    return res.status(422).send({ message: error.message });
  }
};

module.exports = { getUser, getUsers, deleteUser, updateUser };
