import { User } from "../models/user.js";

async function removeExpiredSubscription(){
    const currentDate = new Date();
    await User.updateMany(
        {"subscription.endDate": {$lte: currentDate}},
        {$unset: {subscription:""}}
    );
}

export { removeExpiredSubscription};