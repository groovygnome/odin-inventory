import express from 'express';
const router = express.Router();

import controller from '../controllers/inventoryController.js';

router.get('/inventory/:something', controller.getSomething);

export default router;
