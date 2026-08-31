const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventoryController.js');

router.post('/new', controller.postNew);

module.exports = router;
