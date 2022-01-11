import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/",IndexCtrl.RestoReviewsCtrl.findAllRows);
router.get("/:id",IndexCtrl.RestoReviewsCtrl.findRowById);
router.post("/",IndexCtrl.RestoReviewsCtrl.createRow);
router.put("/:id",IndexCtrl.RestoReviewsCtrl.updateRow);
router.delete("/:id",IndexCtrl.RestoReviewsCtrl.deleteRow);

export default router;