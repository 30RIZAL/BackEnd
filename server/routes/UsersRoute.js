import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
const router = Router();

// method post
router.post("/signup",IndexCtrl.UserCtrl.signup);
router.get("/",IndexCtrl.UserCtrl.findAllRows);
router.post("/signin",IndexCtrl.UserCtrl.signin);
router.delete("/:id",IndexCtrl.UserCtrl.deleteRow);
router.put("/:id",IndexCtrl.UserCtrl.updateUser);


export default router;