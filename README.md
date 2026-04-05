# Local Treasures

Welcome to **Local Treasures**, an authentic marketplace connecting buyers directly to sellers of globally renowned, locally famous traditional products (e.g., Authentic Mysore Pak, Kanchipuram Silk, Handicrafts). Give local artisans a global stage.

This repository contains both a **Vanilla HTML/JS Prototype** (fully functional) and the beginnings of a **Next.js/React** application.

---

## 1. Vanilla HTML/JS Prototype (Active Demo)
Located in the `/local-treasures-html/` directory. This is a fully functional front-end mock that uses `localStorage` to simulate a complete database, authentication, and e-commerce flow entirely locally in the browser.

### How to Run the Prototype:
1. Simply double-click `/local-treasures-html/index.html` to open it in any web browser.
2. (Optional) Use an extension like **Live Server** in VS Code for live reloading.

### Core Features & Flows:
* **Role-Based Authentication:** Sign in or register as a **Buyer** or **Seller**. Authentication state is preserved across pages.
* **Buyer Flow:** 
  * Discover products via the list or interactive OpenStreetMap (Leaflet.js).
  * View detailed product descriptions, add items to the cart, and proceed to checkout.
  * Successful checkouts physically deduct the seller's stock.
* **Seller Flow (Secure Dashboard):** 
  * Manage inventory (Add, Edit, Update Stock/Pricing). Default fallback images ensure the app never breaks visually.
  * Real-time **Orders Tab** tracks incoming paid purchases, linking buyer details with requested items.
* **Direct Buyer-to-Seller Communication:** Integrated query data models allowing buyers to start direct chat threads about specific products, enabling seamless local negotiations.
* **Database (`db.js`):** A custom simulated NoSQL environment handling `lt_users`, `lt_products`, `lt_cart`, `lt_orders`, and `lt_queries`.

---

## 2. Next.js / React Web App (In Progress)
Located in the `/src/` directory. A modern web app built using Next.js 14, React 18, and Tailwind CSS.

### Setup Instructions

1. Open your terminal (or press `` Ctrl + ` `` in VS Code).
2. Inside this extracted project folder, run:

```bash
npm install
```

3. Once packages are installed, start the local development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Completed Thus far (Next.js)
* Fully responsive scaffolding using modern Next.js 14 / React 18 / Tailwind CSS.
* **Landing Page:** Selection routes for Buyer and Seller.
* **Buyer Interactive DiscoveryMap:** Implemented utilizing `react-leaflet` to integrate OpenStreetMap.
* **Filter Database Logic:** A mock regional filtering database setup where typing "Kanchipuram" jumps the map directly to Tamil Nadu to query Kanchipuram textiles, while typing "Mysuru" takes you directly to Karnataka highlighting authentic Mysore Pak, Silk, and Sandalwood. Filtering by category trims down the map markers directly.