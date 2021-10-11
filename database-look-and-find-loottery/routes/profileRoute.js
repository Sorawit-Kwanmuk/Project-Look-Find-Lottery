const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

router.get('/:id', profileController.getProfileById);
router.put('/:id', profileController.updateProfile);

module.exports = router;
