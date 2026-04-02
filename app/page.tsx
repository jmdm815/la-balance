"use client";

import { useEffect, useMemo, useState } from "react";

type MenuItem = { id: number; name: string; description: string; price: number; category: string };
type CartItem = MenuItem & { cartId: string; instructions: string };

const menu: MenuItem[] = [
  { id: 1, name: "Supreme Fulshear", description: "Bacon, egg, ham, potato, cheese", price: 12.99, category: "Breakfast Burritos" },
  { id: 2, name: "The Texans", description: "Tomatoes, onion, jalapeno, egg and cheese", price: 12.99, category: "Breakfast Burritos" },
  { id: 3, name: "Chorizo & Potato", description: "Chorizo, cheese, egg and potato", price: 12.99, category: "Breakfast Burritos" },
  { id: 4, name: "The Hulk", description: "Spinach, onion, mushroom, potato, egg and cheese", price: 12.99, category: "Breakfast Burritos" },
  { id: 5, name: "Bacon & Egg", description: "Pork bacon, egg and cheese", price: 12.99, category: "Breakfast Burritos" },
  { id: 6, name: "Potato & Cheese", description: "Potatoes, egg and cheese", price: 12.99, category: "Breakfast Burritos" },
  { id: 7, name: "Chicken & Potato", description: "Chicken, potato, egg and cheese", price: 12.99, category: "Breakfast Burritos" },
  { id: 8, name: "Sausage & Egg", description: "Home made pork sausage, egg and cheese", price: 12.99, category: "Breakfast Burritos" },

  { id: 9, name: "Tijuana", description: "20/80 grass fed ground beef, Mexican rice, cheese, beans and pico de gallo", price: 14.99, category: "Savory Burritos" },
  { id: 10, name: "Carne Adobada", description: "Slow roasted pork adobo, Mexican rice, cheese, beans and pico de gallo", price: 14.99, category: "Savory Burritos" },
  { id: 11, name: "The Mexican", description: "Chorizo, potato, Mexican rice, cheese, beans and pico de gallo", price: 14.99, category: "Savory Burritos" },
  { id: 12, name: "Carnitas", description: "Simmered pork, Mexican rice, cheese, beans and pico de gallo", price: 14.99, category: "Savory Burritos" },
  { id: 13, name: "Tex-Mex", description: "Fajita beef, lettuce, guacamole, sour cream, Mexican rice, cheese, beans and pico de gallo", price: 16.99, category: "Savory Burritos" },
  { id: 14, name: "Beans & Cheese", description: "Beans, lettuce, guacamole, sour cream, cheese and pico de gallo", price: 11.99, category: "Savory Burritos" },

  { id: 15, name: "Les Escargots de Bourgogne", description: "Garlic, butter, pastis", price: 14.99, category: "French Specialties" },
  { id: 16, name: "Le Steak Frites", description: "Rib eye, pommes frites, mixed greens, mordelaise maitre d butter", price: 33.99, category: "French Specialties" },
  { id: 17, name: "Le Magret de Canard", description: "Duck breast, cabbage, huckleberries", price: 35.99, category: "French Specialties" },
  { id: 18, name: "Seafood Risotto", description: "Seafood saffron risotto", price: 27.99, category: "French Specialties" },

  { id: 19, name: "Crispy Tacos", description: "3 per order. Seasoned ground beef, lettuce, pico de gallo, cheese, rice, beans and sour cream", price: 15.99, category: "Mexican Favorites" },
  { id: 20, name: "Quesadilla - Cheese", description: "Cheese quesadilla", price: 12.99, category: "Quesadillas" },
  { id: 21, name: "Quesadilla - Chicken", description: "Chicken quesadilla", price: 14.99, category: "Quesadillas" },
  { id: 22, name: "Quesadilla - Fajita", description: "Fajita quesadilla", price: 15.99, category: "Quesadillas" },

  { id: 23, name: "Mexican Rice", description: "Side order", price: 5.99, category: "Sides" },
  { id: 24, name: "Refried Beans", description: "Side order", price: 5.99, category: "Sides" },
  { id: 25, name: "French Fries", description: "Side order", price: 6.99, category: "Sides" },
  { id: 26, name: "Truffle Fries", description: "With Pecorino cheese", price: 8.99, category: "Sides" },

  { id: 27, name: "Street Taco", description: "Corn tortilla taco with your choice of fajita, pastor or chicken, served with cilantro and onions", price: 3.99, category: "House Specialties" },
  { id: 28, name: "Gordita", description: "Masa pastry with your choice of fajita, chicken, pastor or chorizo, served with lettuce, tomato, sour cream and cheese", price: 10.99, category: "House Specialties" },
  { id: 29, name: "3 Flautas", description: "Chicken flautas with lettuce, tomato, queso fresco, rice, beans and sour cream", price: 13.99, category: "House Specialties" },
  { id: 30, name: "3 Tacos Dorados de Papa", description: "Lettuce, tomato, queso fresco, rice, beans and sour cream", price: 11.99, category: "House Specialties" },
  { id: 31, name: "Carne Asada", description: "Served with rice, beans, pico de gallo and guacamole", price: 16.99, category: "House Specialties" },
  { id: 32, name: "Fish Taco Plate", description: "3 white sole fish tacos topped with lettuce, pickled onions, avocado, chipotle mayo with rice and beans", price: 14.99, category: "House Specialties" },
  { id: 33, name: "Shrimp Taco Plate", description: "3 shrimp tacos topped with lettuce, pickled onions, avocado, chipotle mayo with rice and beans", price: 14.99, category: "House Specialties" },
  { id: 34, name: "Asado de Puerco", description: "Pork stew with dried chiles, served with rice and beans", price: 15.99, category: "House Specialties" },
  { id: 35, name: "La Balance Enchiladas", description: "Corn tortilla enchiladas with your choice of fajita, pastor or chicken in gravy sauce with rice and beans", price: 16.99, category: "House Specialties" },
  { id: 36, name: "Torta", description: "Soft roll with your choice of fajita, chicken, pastor or chorizo, served with beans, mayonnaise, lettuce, tomato, onions and avocado", price: 11.99, category: "House Specialties" },
  { id: 37, name: "Chicken Acapulco", description: "Cream cheese sauce with mushrooms, spinach and mash potatoes", price: 15.99, category: "House Specialties" },

  { id: 38, name: "Pistachio Tart", description: "Dessert", price: 6.99, category: "Desserts" },
  { id: 39, name: "Chocolate Mousse Cake", description: "Dessert", price: 6.99, category: "Desserts" },
  { id: 40, name: "Tres Leches", description: "Dessert", price: 6.99, category: "Desserts" },
  { id: 41, name: "Limoncello", description: "Dessert", price: 6.99, category: "Desserts" },

  { id: 42, name: "Soda", description: "Sprite, Coke, Diet Coke, Dr. Pepper, Diet Dr. Pepper, Sunkist or Coke Zero", price: 2.99, category: "Beverages" },
  { id: 43, name: "Coffee", description: "Hot coffee", price: 4.99, category: "Beverages" },
  { id: 44, name: "Latte / Iced Latte", description: "Coffee drink", price: 4.99, category: "Beverages" },
  { id: 45, name: "Americano", description: "Coffee drink", price: 4.99, category: "Beverages" },
  { id: 46, name: "Cappuccino", description: "Coffee drink", price: 4.99, category: "Beverages" },
  { id: 47, name: "Espresso", description: "Single shot", price: 3.99, category: "Beverages" },
  { id: 48, name: "Double Shot Espresso", description: "Double shot", price: 4.99, category: "Beverages" },
  { id: 49, name: "Iced Coffee 32 oz", description: "Cold coffee", price: 5.99, category: "Beverages" },
  { id: 50, name: "Hot Tea", description: "Tea", price: 3.99, category: "Beverages" },
  { id: 51, name: "Iced Tea 32 oz", description: "Tea", price: 4.99, category: "Beverages" },
  { id: 52, name: "Mexican Coke", description: "Glass bottle", price: 4.99, category: "Beverages" },
  { id: 53, name: "Jarrito Mexican Soda", description: "Glass bottle", price: 3.99, category: "Beverages" },
  { id: 54, name: "Topo Chico", description: "Glass bottle", price: 3.99, category: "Beverages" },
  { id: 55, name: "Joya Apple Soda", description: "Glass bottle", price: 4.99, category: "Beverages" },
  { id: 56, name: "Sangria Senorial Mexican Soda", description: "Glass bottle", price: 3.99, category: "Beverages" },
  { id: 57, name: "Agua Fresca 32 oz", description: "Fresh drink", price: 4.99, category: "Beverages" },
  { id: 58, name: "Lemonade 32 oz", description: "Fresh drink", price: 4.99, category: "Beverages" },
  { id: 59, name: "Apple Juice", description: "Juice", price: 3.99, category: "Beverages" },
  { id: 60, name: "Orange Juice", description: "Juice", price: 3.99, category: "Beverages" },
  { id: 61, name: "Milk", description: "Whole milk", price: 2.99, category: "Beverages" },
  { id: 62, name: "Bottled Water", description: "Water", price: 2.99, category: "Beverages" }
];

const pickupOptions = [
  { value: "in-store", label: "In-store pickup" },
  { value: "drive-through", label: "Drive-through pickup" }
];

const CART_STORAGE_KEY = "restaurant-cart-v1";
const CHECKOUT_STORAGE_KEY = "restaurant-checkout-v1";

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [instructionsById, setInstructionsById] = useState<Record<number, string>>({});
  const [pickupType, setPickupType] = useState("in-store");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [hydrated, setHydrated] = useState(false);

  const categories = Array.from(new Set(menu.map((item) => item.category)));
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((category, index) => [category, index === 0]))
  );

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      const savedCheckout = window.localStorage.getItem(CHECKOUT_STORAGE_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedCheckout) {
        const parsed = JSON.parse(savedCheckout);
        setCustomerName(parsed.customerName || "");
        setPhone(parsed.phone || "");
        setPickupType(parsed.pickupType || "in-store");
      }
    } catch (error) {
      console.error("Unable to restore local cart memory", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify({ customerName, phone, pickupType }));
  }, [customerName, phone, pickupType, hydrated]);

  const addToCart = (item: MenuItem) => {
    const instructions = instructionsById[item.id] || "";
    setCart((current) => [
      ...current,
      { ...item, cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, instructions }
    ]);
    setInstructionsById((current) => ({ ...current, [item.id]: "" }));
    setStatus("idle");
  };

  const removeFromCart = (cartId: string) => {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
    setStatus("idle");
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((current) => ({ ...current, [category]: !current[category] }));
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
      window.localStorage.removeItem(CART_STORAGE_KEY);
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
          <p className="eyebrow">Menu imported</p>
          <h2>Order ahead for pickup</h2>
          <p className="hero-copy">
            Your menu is now grouped into click-to-expand categories for easier browsing.
          </p>
          <p className="memory-note">
            Cart and checkout details are remembered in the browser if a customer refreshes the page.
          </p>
        </div>
        <div className="hero-card">
          <strong>Cleaner menu</strong>
          <p>Tap a category to open it, then browse just those items.</p>
        </div>
      </section>

      <div className="content-grid">
        <section>
          {categories.map((category) => {
            const items = menu.filter((item) => item.category === category);
            const isOpen = openCategories[category];

            return (
              <div key={category} className="accordion-section">
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isOpen}
                >
                  <span>{category}</span>
                  <span className={`accordion-icon ${isOpen ? "open" : ""}`}>+</span>
                </button>

                {isOpen && (
                  <div className="menu-grid">
                    {items.map((item) => (
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
                )}
              </div>
            );
          })}
        </section>

        <aside className="sidebar">
          <div className="panel">
            <h3>Your cart</h3>
            {hydrated && cart.length === 0 ? (
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
              <div className="pickup-options">
                {pickupOptions.map((option) => (
                  <label key={option.value} className="pickup-choice">
                    <input
                      type="radio"
                      name="pickupType"
                      checked={pickupType === option.value}
                      onChange={() => setPickupType(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
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
