export async function POST(request) {
  try {
    const data = await request.json();

    const { cardNumber, expiryDate, cvv, cardHolderName } = data;

    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const paymentResult = await processPayment(data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return new Response(JSON.stringify({ error: 'Payment processing failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function processPayment(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
} 