import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // Calculate the total order amount
    const totalAmount =
      items.reduce((acc: any, product: any) => acc + product.price, 0) * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "sek",
      description: "Order payment",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Error creating payment intent" },
      { status: 500 }
    );
  }
}
