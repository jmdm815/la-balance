# Restaurant Ordering App

A simple restaurant online ordering app built with Next.js and designed for easy deployment to GitHub and Vercel.

## Features

- Itemized menu with pricing
- Add items to cart
- Remove items from cart
- Custom instructions for each item
- Checkout with pickup options:
  - In-store pickup
  - Drive-through pickup
- Simple front-end MVP for quick launch

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy to GitHub and Vercel

### 1. Create a GitHub repo
Create a new empty repository on GitHub.

### 2. Push this code
```bash
git init
git add .
git commit -m "Initial restaurant ordering app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 3. Deploy on Vercel
- Log in to Vercel
- Import the GitHub repository
- Keep the default Next.js settings
- Click Deploy

## Suggested next upgrades

- Save orders to a database
- Send order confirmation emails or texts
- Add admin dashboard for incoming orders
- Connect payments with Stripe
- Add restaurant branding, logo, and real menu items
