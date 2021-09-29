const User = require("../models/userSchema");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const user = req.body;

  try {
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const usernameExist = await User.findOne({ username: user.username });
    if (usernameExist) {
      return res.status(400).json({ message: "Username already taken." });
    }

    const newUser = new User({
      name: user.name,
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      age: user.age,
    });
    if (newUser) {
      await newUser.save();
      return res.status(201).json({ message: "New user created." });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (updatedUser) {
      console.log(updatedUser);
      return res.status(200).json({ message: "User updated successfully." });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (deletedUser) {
      console.log(deletedUser);
      return res.status(200).json({ message: "User deleted successfully." });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
