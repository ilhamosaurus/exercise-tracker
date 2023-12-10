const express = require('express');
const { landPageHandler } = require('./handler');
const router = express.Router();

router.get('/', landPageHandler);

module.exports = router;