const router = require('express').Router();
const taskController = require('../Controller/taskController');
const verifyUser = require('../Middleware/verifyUser');

router.post('/add', verifyUser, taskController.addTask);
router.get('/get/:email', verifyUser, taskController.getTask);
router.delete('/remove/:id', verifyUser, taskController.delTask);
router.patch('/trash/:id', verifyUser, taskController.trashTask);
router.patch('/status/:id', verifyUser, taskController.handleStatusTask);
router.put('/update/:id', verifyUser, taskController.updateTask);
router.get('/getSpecific/:email', verifyUser, taskController.specificTask);

module.exports = router;
