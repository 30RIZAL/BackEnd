import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/",IndexCtrl.RestoShopCtrl.findAllRows);
router.get("/:id",IndexCtrl.RestoShopCtrl.findRowById);
router.post("/",IndexCtrl.RestoShopCtrl.createRow);
router.put("/:id",IndexCtrl.RestoShopCtrl.updateRow);
router.delete("/:id",IndexCtrl.RestoShopCtrl.deleteRow);

export default router;