import express from "express";
import { VerifyController } from "./verify.controller";
// import auth from "../../middlewares/auth";
// import validateRequest from "../../middlewares/validateRequest";
// import { VerifyValidations } from "./verify.validation";

const router = express.Router();

router.post('/',
  // auth("USER"),
  // validateRequest(VerifyValidations.createVerifyValidation),
  VerifyController.verifyAccount
);

router.post(
  '/',
  // auth("USER"),
  VerifyController.verifyAccount
);




export const VerifyRoute = router;
