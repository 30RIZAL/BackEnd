import { Router } from 'express';
import indexCtrl from '../controller/IndexCtrl'


const router = Router();

router.get("/:id",indexCtrl.OrderCtrl.addOrder);
export default router