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

const getExerciseHandler = async (req, res) => {
  const id = req.params._id;
  const from = req.query.from;
  const to = req.query.to;
  let limit = Number(req.query.limit);
  let from_miliseconds;
  let to_miliseconds;
  let count;
  let exercise;

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({
      error: 'User is not registered'
    });
  }

  if (from && to ) {
    from_miliseconds = new Date(from).getTime() - 1;
    to_miliseconds = new Date(to).getTime() + 1;

    count = await Exercise.find({
      user: id,
      unix: { 
        $gt: from_miliseconds,
        $lt: to_miliseconds
      }
    }).countDocuments();

    if (!limit) {
      limit = count;
    }

    exercise = await Exercise
      .find({
        user: id,
        unix: {
          $gt: from_miliseconds,
          $lt: to_miliseconds
        }
      })
      .select({
        _id: 0,
        description: 1,
        duration: 1,
        date: 1
      })
      .limit(limit)
      .exec();
  }
  else if (from) {
    from_miliseconds = new Date(from).getTime();
    
    count = await Exercise.find({
      user: id,
      unix: {
        $gt: from_miliseconds
      }
    }).countDocuments();
    
    if (!limit) {
      limit = count;
    }

    exercise = await Exercise
      .find({
        user: id,
        unix: {
          $gt: from_miliseconds
        }
      })
      .select({
        _id: 0,
        description: 1,
        duration: 1,
        date: 1
      })
      .limit(limit)
      .exec();
  }
  else if (to) {
    to_miliseconds = new Date(to).getTime();
    
    count = await Exercise.find({
      user: id,
      unix: {
        $lt: to_miliseconds
      }
    }).countDocuments();
    
    if (!limit) {
      limit = count;
    }
    
    exercise = await Exercise
      .find({
        user: id,
        unix: {
          $lt: to_miliseconds
        }
      })
      .select({
        _id: 0,
        description: 1,
        duration: 1,
        date: 1
      })
      .limit(limit)
      .exec();
  };

  count = await Exercise.find({
    user: id
  }).countDocuments();

  if (!limit) {
    limit = count;
  }

  exercise = await Exercise
    .find({
      user: id
    })
    .select({
      _id: 0,
      description: 1,
      duration: 1,
      date: 1
    })
    .limit(limit)
    .exec();
  
  return res.send({
    username: user.username,
    count: count,
    _id: user._id,
    log: exercise
  });
}

module.exports = { landPageHandler, getUsersHandler, addUsersHandler, addExerciseHandler, getExerciseHandler }