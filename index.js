import express from "express";
import http from "http";
import razorRouter from "./routes/razor-pay.js";
import cors from "cors"

const main = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors())

    app.use("/razor",razorRouter);

    const httpServer = http.createServer(app)
    const PORT = process.env.PORT || 3000
    try{
        httpServer.listen(PORT,() => {
            console.log(`Server listening on http://localhost:${PORT}`)
        })
    }catch(err){
        return err;
    }
}

main().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
