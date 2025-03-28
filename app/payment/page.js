'use client';

import { useState, useEffect } from 'react';

// Bad practice: No proper component separation
// Bad practice: No proper error handling
// Bad practice: No proper loading states
export default function PaymentPage() {
  // Bad practice: Multiple state variables that could be combined
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  // Bad practice: Side effects in component without cleanup
  // Bad practice: No proper error handling
  // Bad practice: No proper loading states
  useEffect(() => {
    // Bad practice: Hardcoded API URL
    // Bad practice: No proper error handling
    // Bad practice: No proper loading states
    fetch('http://localhost:3000/api/mockData')
      .then(res => res.json())
      .then(data => {
        setCartData(data);
        // Bad practice: No proper validation
        // Bad practice: No proper error handling
        setFormData({
          cardNumber: data.payment.cardNumber,
          expiryDate: data.payment.expiryDate,
          cvv: data.payment.cvv,
          cardHolderName: data.payment.cardHolderName
        });
        setLoading(false);
      })
      .catch(error => {
        // Bad practice: No proper error handling
        // Bad practice: No proper error logging
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Bad practice: No proper validation
  // Bad practice: No proper error handling
  // Bad practice: No proper input sanitization
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Bad practice: No proper validation
  // Bad practice: No proper error handling
  // Bad practice: No proper API error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Bad practice: Hardcoded API URL
      // Bad practice: No proper error handling
      // Bad practice: No proper loading states
      const response = await fetch('http://localhost:3000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Bad practice: No proper error handling
      // Bad practice: No proper success handling
      // Bad practice: Using alert for user feedback
      if (response.ok) {
        alert('Payment processed successfully!');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      // Bad practice: No proper error handling
      // Bad practice: No proper error logging
      // Bad practice: Using alert for user feedback
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  // Bad practice: No proper loading states
  // Bad practice: No proper error states
  if (loading) {
    return <div>Loading...</div>;
  }

  // Bad practice: Inline styles
  // Bad practice: No proper component separation
  // Bad practice: No proper accessibility
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Checkout</h1>
      
      {/* Bad practice: No proper component separation */}
      {/* Bad practice: No proper error handling */}
      {/* Bad practice: No proper loading states */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Order Summary</h2>
        {cartData.cart.items.map(item => (
          <div key={item.id} style={{ display: 'flex', marginBottom: '10px' }}>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <div style={{ marginLeft: '10px' }}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div>
                <span>Quantity: {item.quantity}</span>
                <span style={{ marginLeft: '10px' }}>${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
        
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal:</span>
            <span>${cartData.cart.subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax (10%):</span>
            <span>${cartData.cart.tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Shipping:</span>
            <span>${cartData.cart.shipping.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>${cartData.cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bad practice: No proper form validation */}
      {/* Bad practice: No proper error handling */}
      {/* Bad practice: No proper accessibility */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2>Payment Information</h2>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              maxLength="19"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              maxLength="5"
              placeholder="MM/YY"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              required
              maxLength="4"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="cardHolderName">Card Holder Name</label>
            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Pay ${cartData.cart.total.toFixed(2)}
        </button>
      </form>
    </div>
  );
} 