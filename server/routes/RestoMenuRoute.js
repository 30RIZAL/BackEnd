import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import UpDonwloadHelper from "../helper/UpDonwloadHelper";

const router = Router();

router.get("/",IndexCtrl.RestoMenuCtrl.findAllRows);
router.get("/:id",IndexCtrl.RestoMenuCtrl.findRowById);
router.get("/beda/ada/",IndexCtrl.RestoMenuCtrl.findOne);
router.post("/",IndexCtrl.RestoMenuCtrl.createRow);
router.post("/search",IndexCtrl.RestoMenuCtrl.menuPading);
// router.put("/:id",IndexCtrl.RestoMenuCtrl.updateRow);
router.put("/:id",IndexCtrl.RestoMenuCtrl.updateProduct);
router.delete("/:id",IndexCtrl.RestoMenuCtrl.deleteRow);


router.get("/images/:filename", UpDonwloadHelper.showProductImage);

export default router;