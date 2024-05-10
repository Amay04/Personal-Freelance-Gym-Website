function initializeRazorpayPayment(razorpayOrder) {
 
  const options = {
    key: 'rzp_test_08wCrm3guGbtKN', // Replace with your actual Razorpay key ID
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    name: "FitClub",
    image:
      "https://th.bing.com/th?id=OIP.36rMNBpi4FsyPT3jfEEK0wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    description: "Product Purchase",
    order_id: razorpayOrder.id,
    handler: async function (response){
    
      // Extract user information from the response
      const userName = razorpayOrder.notes.userName;
      const userEmail = razorpayOrder.notes.userEmail;
      const planId = razorpayOrder.notes.planId;

      // Make a POST request to your server to update the subscription
      const updateSubscriptionResponse = await axios.post(
        "/update-subscription",
        {
          userName: userName,
          userEmail: userEmail,
          planId: planId,
        }
      );
        // Handle the response from the server
        console.log('Subscription updated successfully:', updateSubscriptionResponse.data);
        window.location.href = "/success";
    },
    prefill: {
      name: razorpayOrder.notes.userName,
      email: razorpayOrder.notes.userEmail,
    },
    theme: {
      color: "#0000",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
