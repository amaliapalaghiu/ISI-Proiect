const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getTransportatori);
router.get('/offers/:id', controller.getOffers)
router.post('/offers', controller.addOffer)
router.get('/camioane/:id', controller.getTrucks)
router.post('/camioane', controller.addTruck)
router.get('/cereriClienti', controller.getListaCereriClienti)

module.exports = router;