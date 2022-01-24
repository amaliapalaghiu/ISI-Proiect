const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getTransportatori);
router.get('/offers/:id', controller.getOffers)
router.post('/offers', controller.addOffer)
router.get('/camioane/:id', controller.getTrucks)
router.post('/camioane', controller.addTruck)
router.get('/cereriClienti', controller.getListaCereriClienti)
router.get('/camioane_disponibile', controller.getTrucksAvailable)
router.get('/dateexp/:id', controller.getDateExpeditorFromCerereID)
router.get('/datetrans/:id', controller.getDateTransportatorFromUserID)
router.get('/datecamion', controller.getDataDespreCamionFromUserID)
router.post('/contracte', controller.addContract)
router.get('/toatecontractele/:id', controller.getContractsForAUser)
router.get('/detaliiCerere/:id', controller.getCerere)

module.exports = router;