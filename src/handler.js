const { User } = require("./exercise-db")

const landPageHandler = (req, res) => {
  res.render("index");
}

const getUsersHandler = async (req, res) => {
  const users = await User.find();

  res.send(users);
}

const addUsersHandler = (req, res) => {
  const username = req.body.username;

  const newUser = new User ({
    'username': username
  });

  newUser.save();

  res.json({
    username: newUser.username,
    _id: newUser._id
  });
}

module.exports = { landPageHandler, getUsersHandler, addUsersHandler }