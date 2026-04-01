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
  { id: 3, name: "Caesar Salad", description: "Romaine, parmesan, croutons", price: 8.25, category: "Mains" },
  { id: 4, name: "Fries", description: "Golden seasoned fries", price: 3.99, category: "Sides" },
  { id: 5, name: "Onion Rings", description: "Crispy battered onion rings", price: 4.49, category: "Sides" },
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
  const [submitted, setSubmitted] = useState(false);

  const categories = Array.from(new Set(menu.map((item) => item.category)));

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

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

  const placeOrder = () => {
    if (!cart.length) {
      alert("Add at least one item to the cart before checking out.");
      return;
    }
    if (!customerName.trim() || !phone.trim()) {
      alert("Please add your name and phone number.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Online Ordering</p>
          <h1>Restaurant Pickup Orders</h1>
          <p className="hero-copy">
            Customers can browse the menu, add custom instructions, choose pickup type,
            and review their order before submitting.
          </p>
        </div>
        <div className="hero-card">
          <strong>Deployment ready</strong>
          <p>Built with Next.js so you can push to GitHub and deploy on Vercel.</p>
        </div>
      </section>

      <div className="content-grid">
        <section>
          {categories.map((category) => (
            <div key={category} className="menu-section">
              <h2>{category}</h2>
              <div className="menu-grid">
                {menu
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <article key={item.id} className="menu-card">
                      <div className="menu-card-top">
                        <div>
                          <h3>{item.name}</h3>
                          <p>{item.description}</p>
                        </div>
                        <span className="price">${item.price.toFixed(2)}</span>
                      </div>

                      <label className="instructions-label">
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
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-state">Your cart is empty.</p>
            ) : (
              <div className="cart-list">
                {cart.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <div>
                      <div className="cart-item-row">
                        <strong>{item.name}</strong>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                      {item.instructions ? (
                        <p className="item-note">Instructions: {item.instructions}</p>
                      ) : (
                        <p className="item-note muted">No custom instructions</p>
                      )}
                    </div>
                    <button
                      className="secondary-button"
                      onClick={() => removeFromCart(item.cartId)}
                    >
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

          <div className="panel">
            <h2>Checkout</h2>

            <label className="field">
              Name
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Customer name"
              />
            </label>

            <label className="field">
              Phone
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number"
              />
            </label>

            <fieldset className="pickup-group">
              <legend>Pickup option</legend>
              {pickupOptions.map((option) => (
                <label key={option.value} className="pickup-option">
                  <input
                    type="radio"
                    name="pickupType"
                    value={option.value}
                    checked={pickupType === option.value}
                    onChange={(event) => setPickupType(event.target.value)}
                  />
                  {option.label}
                </label>
              ))}
            </fieldset>

            <button className="primary-button checkout-button" onClick={placeOrder}>
              Submit order
            </button>

            {submitted && (
              <div className="success-box">
                <strong>Order submitted</strong>
                <p>
                  Thank you, {customerName}. Your order is marked for{" "}
                  {pickupType === "in-store" ? "in-store pickup" : "drive-through pickup"}.
                </p>
                <p className="muted">
                  This MVP is front-end only. You can later connect it to email, SMS,
                  Stripe, or a restaurant POS.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
