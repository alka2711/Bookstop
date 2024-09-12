// Initialize Stripe with your public key
const stripe = Stripe('your-publishable-key'); // Replace with your actual Stripe public key

// Create an instance of Elements
const elements = stripe.elements();

// Create a card element and mount it on the page
const card = elements.create('card');
card.mount('#card-element');

// Get references to the form and other elements
const form = document.getElementById('payment-form');
const submitButton = document.getElementById('submit');
const paymentMessage = document.getElementById('payment-message');

// Handle the form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the usual way

    // Disable the button to prevent multiple submissions
    submitButton.disabled = true;

    // Confirm the card payment with Stripe
    const { paymentIntent, error } = await stripe.confirmCardPayment(
        'your-client-secret', // Replace with the client secret from your server
        {
            payment_method: {
                card: card, // The card element we created earlier
                billing_details: {
                    name: 'Customer Name', // Replace with the actual customer's name
                },
            },
        }
    );

    // Check for any errors
    if (error) {
        paymentMessage.textContent = error.message; // Show the error message
        paymentMessage.style.color = 'red'; // Red color for errors
    } else {
        if (paymentIntent.status === 'succeeded') {
            paymentMessage.textContent = 'Payment successful!'; // Success message
            paymentMessage.style.color = 'green'; // Green color for success
        }
    }

    // Re-enable the button
    submitButton.disabled = false;
});
