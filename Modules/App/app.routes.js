import { Router } from "express";

import { auth } from "../User/user.weddelwar.js";
import { upload } from "../../Utils/uplodeFile.js";
import { getApp, uploadeFile } from "./app.controllers.js";

const appRouter = Router();

appRouter.post("/uploadefile", auth(),upload.single('userResume'),uploadeFile);
appRouter.get("/getApp/:id", auth("HR"), getApp);
export default appRouter;


