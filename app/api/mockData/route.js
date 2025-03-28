export async function GET() {

  // DB Connection
  const mockData = {
    cart: {
      items: [
        {
          id: "1",
          name: "DJI Mini 3 Pro Drone",
          price: 759.99,
          quantity: 1,
          image: "https://tododrones.com.ar/wp-content/uploads/2023/05/mini-3-rc-1.jpg",
          description: "DJI Mini 3 Pro with 4K HDR Video, 48MP Photo, 34-min Flight Time, Tri-Directional Obstacle Sensing, and Remote Controller with Screen."
        }
      ],
      subtotal: 759.99,
      tax: 76.00,
      shipping: 25.00,
      total: 860.99
    },
    payment: {
      cardNumber: "4111 1111 1111 1111",
      expiryDate: "12/25",
      cvv: "123",
      cardHolderName: "John Doe"
    }
  };

  return Response.json(mockData);
} 