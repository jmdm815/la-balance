"use client";

import { useMemo, useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

type CartItem = MenuItem & {
  cartId: string;
  instructions: string;
};

const menu: MenuItem[] = [
  { id: 1, name: "Classic Burger", description: "Beef patty, lettuce, tomato, cheese", price: 10.99, category: "Mains" },
  { id: 2, name: "Chicken Sandwich", description: "Crispy chicken, pickles, house sauce", price: 9.49, category: "Mains" },
  { id: 3, name: "Caesar Salad", description: "Romaine, parmesan, parmesan dressing", price: 8.25, category: "Mains" },
  { id: 4, name: "Fries", description: "Seasoned fries with sea salt", price: 3.99, category: "Sides" },
  { id: 5, name: "Onion Rings", description: "Crispy battered rings", price: 4.49, category: "Sides" },
  { id: 6, name: "Soda", description: "Choice of fountain drink", price: 2.49, category: "Drinks" },
  { id: 7, name: "Iced Tea", description: "Fresh brewed sweet or unsweet", price: 2.79, category: "Drinks" }
];

const pickupOptions = [
  { value: "in-store", label: "In-store pickup" },
  { value: "drive-through", label: "Drive-through pickup" }
];

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [instructionsById, setInstructionsById] = useState<Record<number, string>>({});
  const [pickupType, setPickupType] = useState("in-store");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const categories = Array.from(new Set(menu.map((item) => item.category)));
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  const addToCart = (item: MenuItem) => {
    const instructions = instructionsById[item.id] || "";
    setCart((current) => [
      ...current,
      {
        ...item,
        cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        instructions
      }
    ]);
    setInstructionsById((current) => ({ ...current, [item.id]: "" }));
  };

  const removeFromCart = (cartId: string) => {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  };

  const submitOrder = async () => {
    if (!cart.length) {
      alert("Add at least one item before checkout.");
      return;
    }
    if (!customerName.trim() || !phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_ADMIN_API_URL;

    if (!apiBase) {
      alert("Set NEXT_PUBLIC_ADMIN_API_URL in your Vercel environment or .env.local file.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(`${apiBase}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          pickupType,
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: 1,
            instructions: item.instructions || ""
          }))
        })
      });

      if (!response.ok) throw new Error("Failed to submit order.");

      setCart([]);
      setInstructionsById({});
      setCustomerName("");
      setPhone("");
      setPickupType("in-store");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Fast, easy, colorful</p>
          <h2>Order ahead for pickup</h2>
          <p className="hero-copy">
            Browse the menu, leave custom instructions, and choose either in-store pickup
            or drive-through pickup.
          </p>
        </div>
        <div className="hero-card">
          <strong>Brand matched to your logo</strong>
          <p>Updated with your logo colors: red, green, black, and white.</p>
        </div>
      </section>

      <div className="content-grid">
        <section>
          {categories.map((category) => (
            <div key={category} className="menu-section">
              <h3>{category}</h3>
              <div className="menu-grid">
                {menu.filter((item) => item.category === category).map((item) => (
                  <article key={item.id} className="menu-card">
                    <div className="menu-card-top">
                      <div>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <span className="price">${item.price.toFixed(2)}</span>
                    </div>

                    <label className="field">
                      Custom instructions
                      <textarea
                        value={instructionsById[item.id] || ""}
                        onChange={(event) =>
                          setInstructionsById((current) => ({
                            ...current,
                            [item.id]: event.target.value
                          }))
                        }
                        placeholder="No onions, extra sauce, allergy note..."
                      />
                    </label>

                    <button className="primary-button" onClick={() => addToCart(item)}>
                      Add to cart
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <aside className="sidebar">
          <div className="panel">
            <h3>Your cart</h3>
            {cart.length === 0 ? (
              <p className="muted">Your cart is empty.</p>
            ) : (
              <div className="cart-list">
                {cart.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <div className="cart-item-row">
                      <strong>{item.name}</strong>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <p className="item-note">
                      {item.instructions ? `Instructions: ${item.instructions}` : "No custom instructions"}
                    </p>
                    <button className="secondary-button" onClick={() => removeFromCart(item.cartId)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
          </div>

          <div className="panel checkout-panel">
            <h3>Checkout</h3>

            <label className="field">
              Name
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" />
            </label>

            <label className="field">
              Phone
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
            </label>

            <fieldset className="pickup-group">
              <legend>Pickup option</legend>
              {pickupOptions.map((option) => (
                <label key={option.value} className="pickup-option">
                  <input
                    type="radio"
                    checked={pickupType === option.value}
                    onChange={() => setPickupType(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </fieldset>

            <button className="primary-button" onClick={submitOrder} disabled={status === "sending"}>
              {status === "sending" ? "Sending order..." : "Submit order"}
            </button>

            {status === "success" && <p className="success-text">Order submitted successfully.</p>}
            {status === "error" && <p className="error-text">Could not send the order. Check your admin app URL.</p>}
          </div>
        </aside>
      </div>
    </main>
  );
}
