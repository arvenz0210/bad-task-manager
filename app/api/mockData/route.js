export async function GET() {
  try {
    // Bad practice: Hardcoded data
    // Bad practice: No proper error handling
    // Bad practice: No proper validation
    const mockData = {
      cart: {
        items: [
          {
            id: 1,
            name: 'Product 1',
            description: 'This is a product description',
            price: 99.99,
            quantity: 1,
            image: 'https://via.placeholder.com/100'
          },
          {
            id: 2,
            name: 'Product 2',
            description: 'This is another product description',
            price: 149.99,
            quantity: 2,
            image: 'https://via.placeholder.com/100'
          }
        ],
        subtotal: 399.97,
        tax: 39.99,
        shipping: 10.00,
        total: 449.96
      },
      payment: {
        cardNumber: '4111111111111111',
        expiryDate: '12/25',
        cvv: '123',
        cardHolderName: 'John Doe'
      }
    };

    // Bad practice: No proper error handling
    // Bad practice: No proper validation
    // Bad practice: No proper security
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Bad practice: No proper error handling
    // Bad practice: No proper error logging
    // Bad practice: No proper security
    console.error('Error fetching mock data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch mock data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 