const router = require('express').Router();
const taskController = require('../Controller/taskController');
const verifyUser = require('../Middleware/verifyUser');

router.post('/add', verifyUser, taskController.addTask);
router.get('/get/:email', verifyUser, taskController.getTask);

module.exports = router;
