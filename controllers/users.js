const { user } = require("pg/lib/defaults");
const User = require("../models/user");

//CRUD Controller

//get all users
exports.getUser = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => console.log(err));
};

//get user by id
exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json({ user: user });
    })
    .catch((err) => console.log(err));
};

//create user
exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  User.create({
    name: name,
    email: email,
  })
    .then((result) => {
      console.log("Create User");
      res.status(201).json({
        message: "User created user successfully!",
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//update user
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = updatedName;
      user.email = updatedEmail;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "User update", user: result });
    })
    .catch((err) => console.log(err));
};

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return User.destroy({
        where: {
          id: userId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "User deleted!" });
    })
    .catch((err) => console.log(err));
};