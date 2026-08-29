const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventoryController.js');

router.get('/:something', controller.getSomething);

module.exports = router;
