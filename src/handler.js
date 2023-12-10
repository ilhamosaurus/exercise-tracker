const { User } = require("./exercise-db")

const landPageHandler = (req, res) => {
  res.render("index");
}

const getUsersHandler = async (req, res) => {
  const users = await User.find();

  res.send(users);
}

module.exports = { landPageHandler, getUsersHandler }