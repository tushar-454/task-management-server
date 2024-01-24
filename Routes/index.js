const router = require('express').Router();
const taskRoutes = require('./task');
const jwtRoutes = require('./jwt');
const userRoutes = require('./user');

router.use('/api/v1/task', taskRoutes);
router.use('/api/v1/jwt', jwtRoutes);
router.use('/api/v1/user', userRoutes);

module.exports = router;
