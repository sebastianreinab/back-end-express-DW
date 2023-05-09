const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-token');
const { listarTask, crearTask, actualizarTask, eliminarTask } = require('../controllers/Task.js')

router.use(validarJWT)

router.get('/', listarTask)
router.post('/', crearTask)
router.put('/:id', actualizarTask)
router.delete('/:id', eliminarTask)

module.exports = router;