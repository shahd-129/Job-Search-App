import {Router} from 'express'
import { addCompany, deleteCompany, getSpecificJob, searchCompany, updateCompany } from './company.controllers.js'
import { auth } from '../User/user.weddelwar.js'

const companyRouter = Router()


companyRouter.post("/add" ,auth("HR") , addCompany)
companyRouter.put("/update" , auth("HR"),updateCompany)
companyRouter.delete("/delete" ,auth("HR") ,deleteCompany)
companyRouter.get("/search" ,auth("HR" , "user") ,searchCompany)
companyRouter.get("/getSpecificJob" ,auth("HR") ,getSpecificJob)


export default companyRouter