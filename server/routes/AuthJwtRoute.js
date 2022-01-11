import { Router } from "express";
import authJWT from "../helper/authJWT";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.post("/signin",authJWT.authenticate,authJWT.login);
router.post("/signup",IndexCtrl.UserCtrl.signup);
export default router;