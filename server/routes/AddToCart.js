import { Router } from 'express';
import indexCtrl from '../controller/IndexCtrl'


const router = Router();

router.get("/",indexCtrl.CartCtrl.findAllRows);

router.get("/:id",indexCtrl.CartCtrl.findRowById);

router.post('/item/:id', indexCtrl.UserCtrl.cekUser,
    indexCtrl.RestoShopCtrl.findout,
    indexCtrl.CartCtrl.cekcart,
    indexCtrl.CartCtrl.create,
    indexCtrl.RestoMenuCtrl.findout,
    indexCtrl.ClitCtrl.cekclit,
    indexCtrl.ClitCtrl.createclit);

router.post('/order/:id', indexCtrl.UserCtrl.cekUser,
    indexCtrl.CartCtrl.cekcart,
    indexCtrl.CartCtrl.findqty,
    indexCtrl.OrderCtrl.payment,
    indexCtrl.OrderCtrl.cekord,
    indexCtrl.OrderCtrl.create,
    indexCtrl.CartCtrl.closecart,
    indexCtrl.ClitCtrl.checkline);

router.put('/ordered/:id', indexCtrl.UserCtrl.cekUser,
    indexCtrl.OrderCtrl.cekord,
    indexCtrl.CartCtrl.cekcartclose,
    indexCtrl.CartCtrl.findqty,
    indexCtrl.OrderCtrl.cekord,
    indexCtrl.OrderCtrl.update,
    indexCtrl.ClitCtrl.checkpay);

router.put('/cancel/:id', indexCtrl.UserCtrl.cekUser,
    indexCtrl.OrderCtrl.cekord,
    indexCtrl.OrderCtrl.cancel)

router.put('/update/:id', indexCtrl.UserCtrl.cekUser,
    indexCtrl.RestoShopCtrl.findout,
    indexCtrl.CartCtrl.cekcart,
    indexCtrl.RestoMenuCtrl.findout,
    indexCtrl.ClitCtrl.cekclit,
    indexCtrl.ClitCtrl.updatelite);

export default router;