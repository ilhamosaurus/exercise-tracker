const express = require('express');
const { landPageHandler, getUsersHandler, addUsersHandler, addExerciseHandler } = require('./handler');
const router = express.Router();

router.get('/', landPageHandler);

router.get('/users', getUsersHandler);

router.post('/users', addUsersHandler);

router.post('/users/:_id/exercises', addExerciseHandler);

module.exports = router;