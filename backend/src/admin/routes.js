const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/users', controller.getUsers);
router.post('/modificaDate', controller.updateUser);

module.exports = router;