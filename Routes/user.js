const userController = require('../Controller/userController');

const router = require('express').Router();

router.post('/create', userController.createUser);

module.exports = router;
