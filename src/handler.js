const { User } = require("./exercise-db")

const landPageHandler = (req, res) => {
  res.render("index");
}

module.exports = { landPageHandler }