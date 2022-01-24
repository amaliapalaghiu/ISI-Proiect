const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/oferte', controller.getOferte);
router.get('/:id', controller.getExpeditorbyUserId);
router.get('/cereri/:id', controller.getCereri);
router.post('/cereri', controller.addCerere);


module.exports = router;