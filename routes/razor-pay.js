import express from "express";
import { razorPayInstance } from "../constants/index.js";


const razorRouter = express.Router()

razorRouter.get("/payments", async (req,res) => {

    razorPayInstance.payments.all({},(error,response) => {
        if(error){
            return res.json({
                error
            })
        }
        return res.json({response})
    })

});

razorRouter.post("/payments/order", async (req,res ) => {
    const { amount } = req.body
    try{
        const options = {
            amount,
            currency: "INR",
            receipt: "order_rcptid_11"
        }
        razorPayInstance.orders.create(options,(error,response) => {
            if(!error) return res.json({response})
            return res.json({err})
        })
    }catch(err){
        return res.json({err})
    }
})


export default razorRouter;
