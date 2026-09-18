const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventoryController.js');

router.post('/new', controller.postNew);
router.get('/weapon/:weaponId', controller.getWeapon);
router.get('/series/:seriesName', controller.getSeries);
router.post('/delete/:weaponId', controller.deleteWeapon);
router.post('/delete/:seriesId', controller.deleteSeries);

module.exports = router;
