"use client";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51PJdW7AaT4hmzFm2xtkl40KR0azG5YreKOSadkoYEmA1w51ybeuyz2mc7gAWeQvHIFF8jwNDfF1e0iYvZnCnfqTN00sX82kpDp"
);

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const storedProducts = localStorage.getItem("cart");
        const items: Product[] = storedProducts
          ? JSON.parse(storedProducts)
          : [];

        if (items.length > 0) {
          const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "night",
    },
  };

  return (
    <div className="App">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
