const { ObjectId } = require("mongodb");
const { User, Exercise } = require("./exercise-db")

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

  res.status(200);
  res.json({
    username: newUser.username,
    _id: newUser._id
  });
}

const addExerciseHandler = async (req, res) => {
  const id = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  let date = req.body.date;
  let unix, newExercise;

  if (!date) {
    date = new Date().toDateString()
    unix = new Date().getTime();
  }
  else {
    unix = new Date().getTime();
    date = new Date().toDateString()
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404).send('Invalid user');
  }

  try {
    const newExerciseObject = new Exercise({
      user: new ObjectId(id),
      date: date,
      unix: unix,
      duration: duration,
      description: description,
    });

    newExercise = await newExerciseObject.save();
  }
  catch (err) {
    res.status(400).send(err.message);
  }

  return res.send({
    _id: user._id,
    username: user.username,
    date: newExercise.date,
    duration: newExercise.duration,
    description: newExercise.description,
  });
}

module.exports = { landPageHandler, getUsersHandler, addUsersHandler, addExerciseHandler }