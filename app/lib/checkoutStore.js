'use client';

import { createContext, useContext, useState } from 'react';

// Bad practice: Global context without proper structure
// Bad practice: No proper error handling
// Bad practice: No proper loading states
const CheckoutContext = createContext();

// Bad practice: No proper error handling
// Bad practice: No proper loading states
export function CheckoutProvider({ children }) {
  // Bad practice: Multiple state variables that could be combined
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Bad practice: No proper validation
  // Bad practice: No proper error handling
  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Bad practice: No proper validation
  // Bad practice: No proper error handling
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Bad practice: No proper validation
  // Bad practice: No proper error handling
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Bad practice: No proper validation
  // Bad practice: No proper error handling
  // Bad practice: No proper API error handling
  const submitOrder = async () => {
    try {
      setLoading(true);
      // Bad practice: Hardcoded API URL
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      // Bad practice: No proper success handling
      // Bad practice: No proper error handling
      setCurrentStep(1);
      setFormData({});
    } catch (err) {
      setError('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider value={{
      currentStep,
      formData,
      loading,
      error,
      updateFormData,
      nextStep,
      prevStep,
      submitOrder,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

// Bad practice: No proper error handling
// Bad practice: No proper loading states
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
} 