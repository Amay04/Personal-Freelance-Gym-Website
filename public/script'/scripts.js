$(document).ready(function(){
    $('#appointmentForm').submit(function(event){
      event.preventDefault(); // Prevent default form submission behavior
      
      // Get form input values
      var fullName = $('#fullName').val().trim();
      var email = $('#email').val().trim();
      var phone = $('#phone').val().trim();
      var appointmentDate = $('#appointmentDate').val().trim();
  
      // Check for empty fields or invalid input format
      if (!fullName || !email || !phone || !appointmentDate || !isValidEmail(email) || !isValidPhone(phone)) {
        // Display error message for invalid input
        $('#bookingSuccessMessage').html('<p class="text-danger">Please fill out all fields correctly.</p>').show();
      } else {
        // Simulate a successful booking
        $('#bookingSuccessMessage').html('<p class="text-success">Booking was successful!</p>').show();
        // Reset the form after successful booking
        $('#appointmentForm')[0].reset();
      }
  
      // Return false to prevent form submission and page reload
      return false;
    });
  });
  
  // Function to validate email format
  function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  // Function to validate phone number format (assuming 10 digits)
  function isValidPhone(phone) {
    var phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  }
  