const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/get', controller.getUsers);
router.post('/add', controller.addUsers);

module.exports = router;