const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getCereri);
router.post('/add', controller.addCereri);

module.exports = router;