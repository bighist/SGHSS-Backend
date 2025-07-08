const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pacienteController');

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.get('/', ctrl.getAll);
router.delete('/:id', ctrl.delete);

module.exports = router;
