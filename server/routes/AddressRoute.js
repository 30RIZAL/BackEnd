import { Router } from 'express';
import IndexCtrl from '../controller/IndexCtrl';

const router = Router();

router.get('/', IndexCtrl.AddresCtrl.findAllRows);
router.get('/:id', IndexCtrl.AddresCtrl.findOne);
router.post('/', IndexCtrl.AddresCtrl.createRow);
router.put('/:id', IndexCtrl.AddresCtrl.updateRow);
router.delete('/:id', IndexCtrl.AddresCtrl.deleteRow);

export default router;
