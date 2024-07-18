import { Router } from "express";
import {
  addJob,
  deleteJob,
  filterJob,
  getInformationJob,
  getSearch,
  updateJob,
} from "./job.controllers.js";
import { auth } from "../User/user.weddelwar.js";

const jobRouter = Router();

jobRouter.post("/addjob", auth("HR"), addJob);
jobRouter.put("/updatejob", auth("HR"), updateJob);
jobRouter.delete("/deletejob", auth("HR"), deleteJob);
jobRouter.get("/getjob", auth(), getInformationJob);
jobRouter.get("/getsearchjob", auth(), getSearch);
jobRouter.get("/filterjob", auth(), filterJob);

export default jobRouter;


