import { Router } from 'express';
import indexCtrl from '../controller/IndexCtrl'


const router = Router();
router.get("/",indexCtrl.ClitCtrl.findAllRows);
router.delete("/:id",indexCtrl.ClitCtrl.deleteRow);

router.get("/:id",indexCtrl.ClitCtrl.findRowById);
export default router