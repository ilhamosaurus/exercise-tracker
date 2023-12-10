const express = require('express');
const { landPageHandler, getUsersHandler, addUsersHandler } = require('./handler');
const router = express.Router();

router.get('/', landPageHandler);

router.get('/users', getUsersHandler);

router.post('/users', addUsersHandler);

module.exports = router;