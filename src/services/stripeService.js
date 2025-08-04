// Stripe Payment Service
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const createCheckoutSession = async (gigData, totalAmount) => {
  try {
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const response = await fetch(`${API_BASE_URL}/api/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add JWT token
      },
      body: JSON.stringify({
        gigId: gigData.id,
        gigTitle: gigData.title,
        freelancerId: gigData.freelancer.id || 'freelancer_id', // You'll need to add this to gig data
        amount: totalAmount,
        currency: 'inr',
        customerEmail: user.email // Pass customer email for pre-filling
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = (sessionUrl) => {
  if (sessionUrl) {
    window.location.href = sessionUrl;
  } else {
    throw new Error('No checkout session URL provided');
  }
};

export const handlePaymentSuccess = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ sessionId })
    });

    if (!response.ok) {
      throw new Error('Failed to confirm payment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
}; 