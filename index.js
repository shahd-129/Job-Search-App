import express from'express'
import './DB/Connection.js'
import userRouter from './Modules/User/user.routes.js'
import { AppError } from './Utils/ErrorHandling.js'
import companyRouter from './Modules/Company/company.routes.js'
import jobRouter from './Modules/Job/job.routes.js'
import appRouter from './Modules/App/app.routes.js'
const app = express()
const port = 3000



app.use(express.json())




app.use("/user" , userRouter)
app.use("/" , companyRouter)
app.use("/", jobRouter)
app.use("/", appRouter)


app.use("*" , (req , res , next) =>{
    next(new AppError(req.originalUrl + "not found" , 404))
})


app.use((err , req , res , next) =>{
    const {message , statusCode} = err
    res.status(statusCode || 500).json({message})
}
)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))