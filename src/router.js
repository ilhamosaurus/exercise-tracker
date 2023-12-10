const express = require('express');
const { landPageHandler, getUsersHandler } = require('./handler');
const router = express.Router();

router.get('/', landPageHandler);

router.get('/users', getUsersHandler);

module.exports = router;