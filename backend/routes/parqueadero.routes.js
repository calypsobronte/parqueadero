import {Router} from "express";
const router = Router();

import * as parqueaderoCtr from "../controllers/parqueadero.controllers";

router.get('/', parqueaderoCtr.getAll);
router.get('/:placa', parqueaderoCtr.getByTarifaAndPlaca);
router.post('/', parqueaderoCtr.save);
router.get('/rate', parqueaderoCtr.getAllByTarifaAndPlaca);
router.put('/state/:placa', parqueaderoCtr.state)
router.put('/exit/:placa', parqueaderoCtr.exit); 

export default router;