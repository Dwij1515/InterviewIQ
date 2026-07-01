import express from "express"
import dotenv from "dotenv"
import dns from "dns"
dns.setDefaultResultOrder("ipv4first")
dns.setServers(["8.8.8.8", "1.1.1.1"])
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:3000",
            process.env.FRONTEND_URL
        ].filter(Boolean).map(url => url.replace(/\/$/, ""));
        
        const isVercel = origin.endsWith(".vercel.app");
        const isLocalhost = origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:");
        
        const isAllowed = allowedOrigins.includes(origin) || 
                          allowedOrigins.includes(origin.replace("https://", "").replace("http://", "")) ||
                          isVercel || 
                          isLocalhost;
                          
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview" , interviewRouter)
app.use("/api/payment" , paymentRouter)

const PORT = process.env.PORT || 6000
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
    connectDb()
})
