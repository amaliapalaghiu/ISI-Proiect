const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/oferte', controller.getOferte);
router.get('/:id', controller.getExpeditorbyUserId);
router.get('/cereri/:id', controller.getCereri);
router.post('/cereri', controller.addCerere);
router.get('/datetrans/:id', controller.getDateTransportatorFromOfertaID)
router.post('/contracte', controller.addContract)
router.get('/camion/:id', controller.getCamion);
router.get('/cerere/:id', controller.getCerereById);



module.exports = router;