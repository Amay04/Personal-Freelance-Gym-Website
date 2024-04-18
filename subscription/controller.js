import { Plan } from "../models/plans.js";
import { User } from "../models/user.js";

async function getUserSubscription(userId){
    const user = await User.findById(userId).populate("subscription.plan");
    return user.subscription;
}

async function updateUserSubscription(userId , planId){
    const plan = await Plan.findById(planId);
    const currentDate = new Date();
    const endDate = new Date(currentDate.getTime() + plan.duration * 24 * 60 * 60 * 1000);

    await User.findByIdAndUpdate(userId,{
        $set:{
            "subscription.plan" : planId,
            "subscription.startDate": currentDate,
            "subscription.endDate" :endDate,
        },
    });
}

export { getUserSubscription , updateUserSubscription};