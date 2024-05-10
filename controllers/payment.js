import uniqid from "uniqid";
import razorpay from "razorpay";
import { Plan } from "../models/plans.js";
import { User } from "../models/user.js";


// Assuming you have initialized your Razorpay instance
const instance = new razorpay({
  key_id: 'rzp_test_08wCrm3guGbtKN',
  key_secret:'pKYXaOw6hryQsRoKjjPfwmz2'
});

// Define your route handler function
export const payment = async (req, res) => {
  try {
    // Extract necessary information from the request, such as the plan ID
    const { planId } = req.body;
    let user = req.user;
    
    // Assuming you have a function to retrieve plan details from a database or other source
    const plan = await Plan.findById(planId);

    // Create a Razorpay order using the retrieved plan details
    const order = await instance.orders.create({
      amount: plan.amount * 100, // Amount should be in paise
      currency: 'INR', // Change currency as per your requirement
      receipt: uniqid, // Unique order ID or receipt ID
      payment_capture: 1, // Automatically capture payments
      notes: { // Additional notes about the order
        userId: user._id,
        userName:user.name,
        userEmail: user.email,
        planId: plan._id,
      },
    });
console.log(order)
    // Send the order details back to the client
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
          // You may calculate the end date based on the plan duration or any other logic
          // For simplicity, let's assume the subscription is valid for 30 days
          endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000)
      };

      // Save the updated user object
      await user.save();

      // Send a success response
      res.render("success");

  } catch (error) {
      console.error('Error updating subscription:', error);
      res.status(500).json({ error: 'An error occurred while updating the subscription' });
  }
};


