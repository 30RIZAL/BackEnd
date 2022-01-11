import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/",IndexCtrl.RestoCategoryCtrl.findAllRows);
router.get("/:id",IndexCtrl.RestoCategoryCtrl.findRowById);
router.post("/",IndexCtrl.RestoCategoryCtrl.createRow);
router.put("/:id",IndexCtrl.RestoCategoryCtrl.updateRow);
router.delete("/:id",IndexCtrl.RestoCategoryCtrl.deleteRow);


export default router;