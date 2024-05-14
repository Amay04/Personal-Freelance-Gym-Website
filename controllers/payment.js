import uniqid from "uniqid";
import razorpay from "razorpay";
import { Plan } from "../models/plans.js";
import { User } from "../models/user.js";


const instance = new razorpay({
  key_id: 'rzp_test_08wCrm3guGbtKN',
  key_secret:'pKYXaOw6hryQsRoKjjPfwmz2'
});

export const payment = async (req, res) => {
  try {
    const { planId } = req.body;
    let user = req.user;
    
    const plan = await Plan.findById(planId);

    const order = await instance.orders.create({
      amount: plan.amount * 100, 
      currency: 'INR', 
      receipt: uniqid, 
      payment_capture: 1, 
      notes: { 
        userId: user._id,
        userName:user.name,
        userEmail: user.email,
        planId: plan._id,
      },
    });
    
    res.json(order);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
};




// Define your route handler function to update subscription
export const updateSubscription = async (req, res) => {
  try {
      // Extract necessary information from the request
      const {userEmail, planId } = req.body;

      const plan = await Plan.findById(planId);

      // Find the user based on the provided email
      const user = await User.findOne({ email: userEmail });

      // Update the user's subscription information
      user.subscription = {
          plan: plan._id,
          startDate: new Date(),
          endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000)
      };

      // Save the updated user object
      await user.save();

  } catch (error) {
      console.error('Error updating subscription:', error);
      res.status(500).json({ error: 'An error occurred while updating the subscription' });
  }
};


