import express, { response } from "express";
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


razorRouter.route("/payments/plan")
    .post((req,res) => {
        const {amount,period,name,currency,description,notes} = req.body;
        try{
            razorPayInstance.plans.create({
                period:period,
                interval: 1,
                item:{
                    name,
                    amount,
                    currency,
                    description
                },
                notes

            },(error,response) => {
                if(!error) return res.json({response})
                return res.json({error})
            })
        }catch(err){
            return res.json({err})
        }
    })

    .get( async (_,res) => {
        try {
            const response = await razorPayInstance.plans.all()
            return res.json({response})
        } catch (error) {
            return res.json({error})
        }
    });

razorRouter.get("/payments/plans/:id", (req,res) => {
    try {
        const {id} = req.params;

        razorPayInstance.plans.fetch(id,(error,response) => {
            if(!error) return res.json({response})
            return res.json({error})
        })
    } catch (error) {
        return res.json({error})
    }
})


razorRouter.route("/payments/subscription")

    .post((req,res) => {
        try {
            const {plan_id,quantity,total_count} = req.body;
            razorPayInstance.subscriptions.create({
                plan_id,
                customer_notify:1,
                quantity,
                total_count
            },(error,response) => {
                if(!error) return res.json({response})
                return res.json({error})
            })
        } catch (error) {
            return res.json({error})
        }
    })



export default razorRouter;
