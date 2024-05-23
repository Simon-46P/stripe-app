"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Grid from "./components/Grid/Grid";
import GridItem from "./components/GridItem/GridItem";
import Cart from "./components/Cart/Cart";
import Button from "../app/components/Elements/Button";

export default function Home() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Retrieve cart items from localStorage when the component mounts
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Store cart items in localStorage whenever the cart state changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const products = [
    {
      id: 1,
      title: "Shoes",
      description: "Just some shoes, duh (?)",
      price: 190,
      image: "/assets/shoes.jpg",
    },
    {
      id: 2,
      title: "T-shirt",
      description: "Just a t-shirt, duh (?)",
      price: 110,
      image: "/assets/shirt.webp",
    },
    {
      id: 3,
      title: "Scarf",
      description: "Just a scarf, duh (?)",
      price: 400,
      image: "/assets/scarf.webp",
    },
  ];

  const onAddToCart = (product) => {
    // Update the cart state
    setCart((prev) => [...prev, product]);

    // Update the cart in localStorage
    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleGoToCheckout = () => {
    // Perform navigation to checkout page
    window.location.href = "/checkout";
  };

  return (
    <main className="webshop flex flex-column justify-center gap-xxl">
      <h1 style={{ textAlign: "center" }}>My webshop</h1>
      <div className="wrapper contained flex flex-column gap-xxl justify-center align-center">
        <Grid columns={3} gap={"m"}>
          {products &&
            products.map((p) => {
              return (
                <GridItem key={p.id}>
                  <ProductCard
                    id={p.id}
                    onAddToCart={() => onAddToCart(p)}
                    title={p.title}
                    description={p.description}
                    price={p.price}
                    image={p.image}
                  />
                </GridItem>
              );
            })}
        </Grid>

        <Cart products={cart} />

        {cart.length > 0 && (
          <Button
            label={"To checkout"}
            className={"primary"}
            onClick={handleGoToCheckout}
          />
        )}
      </div>
    </main>
  );
}
