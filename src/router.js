const express = require('express');
const { landPageHandler, getUsersHandler, addUsersHandler, addExerciseHandler, getExerciseHandler } = require('./handler');
const router = express.Router();

router.get('/', landPageHandler);

router.get('/users', getUsersHandler);

router.post('/users', addUsersHandler);

router.post('/users/:_id/exercises', addExerciseHandler);

router.get('/users/:_id/logs', getExerciseHandler);

module.exports = router;