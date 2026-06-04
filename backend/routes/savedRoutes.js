const express = require('express');
const router = express.Router();
const { saveResource, getSavedResources } = require('../controllers/savedController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Todas estas rutas requieren estar logueado

router.route('/')
    .get(getSavedResources)
    .post(saveResource);

module.exports = router;