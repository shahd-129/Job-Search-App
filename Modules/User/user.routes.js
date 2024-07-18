import { Router } from "express";
import {
  deleteAcc,
  forgetPass,
  GetAllAccRecoveryEmail,
  getAllData,
  getAllDataById,
  signin,
  signup,
  updateAcc,
  updatePassword,
} from "./user.controllers.js";
import { auth } from "./user.weddelwar.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", signin);
userRouter.put("/update", auth(), updateAcc);
userRouter.put("/updatepass", auth(), updatePassword);
userRouter.delete("/delete", auth(), deleteAcc);
userRouter.patch("/forgetpass", auth(), forgetPass);
userRouter.get("/getAll", auth(), getAllData);
userRouter.get("/getById/:id", getAllDataById);
userRouter.get("/getverifyAcc", GetAllAccRecoveryEmail);
export default userRouter;
