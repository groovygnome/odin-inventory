const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventoryController.js');

router.post('/new', controller.postNew);
router.get('/weapon/:weaponId', controller.getWeapon);
router.post('/delete/:weaponId', controller.deleteWeapon);

module.exports = router;
