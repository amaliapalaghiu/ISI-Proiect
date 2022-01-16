const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getTransportatori);
router.get('/offers/:id', controller.getOffers)

module.exports = router;