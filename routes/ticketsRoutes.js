const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticketsController');

router.get('/', controller.listar);
router.get('/:codigo', controller.mostrar);
router.post('/novo', controller.criar);
router.post('/atualizar/:codigo', controller.atualizar);
router.post('/remover/:codigo', controller.remover);

module.exports = router;