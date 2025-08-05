// Stripe Payment Service
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const createCheckoutSession = async (gigData, totalAmount) => {
  try {
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    console.log('Creating checkout session for:', { gigData, totalAmount, user, token: token ? 'present' : 'missing' });
    
    const requestBody = {
      gigId: gigData.id,
      gigTitle: gigData.title,
      freelancerId: gigData.freelancer.id || 'freelancer_id',
      amount: totalAmount,
      currency: 'inr',
      customerEmail: user.email,
      customerName: user.name || user.username || 'Customer', // Add customer name
    };
    
    console.log('Request body:', requestBody);
    
    const response = await fetch(`${API_BASE_URL}/api/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Checkout session data:', data);
    console.log('Session URL:', data.sessionUrl);
    console.log('Session ID:', data.sessionId);
    
    if (!data.sessionUrl) {
      console.error('No session URL in response. Full response:', data);
      throw new Error('No session URL in response');
    }
    
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = (sessionUrl) => {
  console.log('Redirecting to checkout with URL:', sessionUrl);
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