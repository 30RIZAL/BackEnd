import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/",IndexCtrl.MenuTypeCtrl.findAllRows);
router.get("/:id",IndexCtrl.MenuTypeCtrl.findRowById);
router.post("/",IndexCtrl.MenuTypeCtrl.createRow);
router.put("/:id",IndexCtrl.MenuTypeCtrl.updateRow);
router.delete("/:id",IndexCtrl.MenuTypeCtrl.deleteRow);

export default router;