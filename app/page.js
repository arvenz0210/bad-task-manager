'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function CheckoutPage() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  useEffect(() => {
    fetch('/api/mockData')
      .then(res => res.json())
      .then(data => {
        setCartData(data);
        setFormData({
          cardNumber: data.payment.cardNumber,
          expiryDate: data.payment.expiryDate,
          cvv: data.payment.cvv,
          cardHolderName: data.payment.cardHolderName
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Payment processed successfully!');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      
      <div className={styles.cartSummary}>
        <h2>Order Summary</h2>
        {cartData.cart.items.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemImageContainer}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
            </div>
            <div className={styles.itemDetails}>
              <h3>{item.name}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
              <div className={styles.itemPrice}>
                <span className={styles.quantity}>Quantity: {item.quantity}</span>
                <span className={styles.price}>${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span>Subtotal:</span>
            <span>${cartData.cart.subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Tax (10%):</span>
            <span>${cartData.cart.tax.toFixed(2)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping:</span>
            <span>${cartData.cart.shipping.toFixed(2)}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total:</span>
            <span>${cartData.cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>Payment Information</h2>
          <div className={styles.formGroup}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              maxLength="19"
            />
          </div>
          <div className={styles.formGroup}>
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
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              required
              maxLength="4"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cardHolderName">Card Holder Name</label>
            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Pay ${cartData.cart.total.toFixed(2)}
        </button>
      </form>
    </div>
  );
}
