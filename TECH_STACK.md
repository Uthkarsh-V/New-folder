# Local Treasures - Technical Stack & Architecture

This document outlines the complete technical stack for the current `local-treasures-html` prototype, broken down by category, including the rationale for utilizing these specific technologies and exactly where they are used within the project.

## 1. Frontend Interface & Styling
* **Technologies:** HTML5, Vanilla JavaScript (ES6+), and Tailwind CSS (via CDN).
* **Where it is used (Component Mapping):**
  * `index.html`: The entry point, handling role-based authentication UI (switching between Buyer and Seller mock logins).
  * `buyer-dashboard.html`: The primary consumer discovery page. Houses the interactive map, category filters, and the dynamic grid of regional treasures.
  * `product.html`: The individual item view. Parses URL parameters (e.g., `?id=prod_1`) to hydrate data. It also houses the **AI Chatbot Modal** used for simulated price negotiation.
  * `cart.html`: Dynamically lists chosen items by fetching from the local storage cart array.
  * `checkout.html`: The final standalone order form, containing the Stripe integration, user detail inputs, and the UPI simulation modal.
  * `orders.html`: The post-purchase buyer tracking screen featuring a 5-step visual progress bar linked directly to the seller's updates.
  * `seller-dashboard.html`: The merchant hub. It utilizes heavily tabbed JS logic to switch between Inventory Management (to add/edit products) and Orders Tracking (to update shipment statuses).
* **Why we used them:**
  * **Speed & Zero-Build:** Vanilla JS and raw HTML require zero compilation (no Babel, Webpack, or Node server needed). This allows for instant browser refreshes and hyper-rapid prototyping.
  * **Tailwind CSS:** Allows utility-first styling directly inside HTML elements. It eliminates the need to switch back and forth to external CSS files and prevents CSS bloat compared to writing custom styles.
* **Why not React/Next.js?** While there is a Next.js scaffold in the root directory for production, utilizing a heavy framework for initial prototyping introduces compilation lag. Vanilla JS proves the logic and UX flows fastest.

## 2. Backend Controller Logic (Simulated)
* **Technologies:** Browser-based Controller Logic (`db.js`) & Python HTTP Server (`python -m http.server`).
* **Where it is used (Component Mapping):**
  * **Python Server:** Running actively in the local terminal (Port 8000) serving the `local-treasures-html` directory to bypass browser CORS and strict file protocol boundaries.
  * `db.js`: This single file acts as our entire API controller. Every HTML page imports `<script src="db.js"></script>`. It houses functions like `initDB()`, `getProducts()`, `createOrder()`, and the conversational data sync arrays.
* **Why we used them:**
  * **Python Server:** Universally pre-installed on most systems, avoiding massive `node_modules` installations just to host a local port.
  * **Logic via `db.js`:** Mocking the backend identically in JS allows us to perfect the data flow (Cart -> Checkout -> Order History -> Seller Sync) instantly before committing to server code.
* **Why not Node.js / Express?** Writing a true backend requires designing REST endpoints and managing latency. This mock approach validates business logic offline smoothly.

## 3. Database & Data Persistence
* **Technologies:** Web HTML5 `localStorage` (Wrapped by `db.js`).
* **Where it is used (Component Mapping):**
  * `lt_users`: Stores mock credentials allowing the auth system in `index.html` to log in users like 'Guru Sweets' (Seller) and 'Priya' (Buyer).
  * `lt_products`: Seeded via `initDB()`. Holds all regional item data (price, stock, `sellerId`, lat/lng) powering the map and both dashboards.
  * `lt_orders`: Written to during `checkout.html` submission. Read by `seller-dashboard.html` to update status, and read by `orders.html` to animate the buyer's tracking bar dynamically.
  * `lt_cart`: A volatile array representing the active user's shopping cart session.
* **Why we used them:**
  * **Persistence without overhead:** `localStorage` retains data perfectly simulating a relational database without setting up schemas, ORMs (like Prisma), or cloud database clusters. It proves the relational logic works entirely offline.

## 4. External APIs & Integrations
* **Payment SDK: Stripe Elements (`js.stripe.com/v3`)**
  * **Where it is used:** Exclusively inside `checkout.html`. It mounts the `#card-element` securely and handles the tokenization logic. We also built a custom UPI verification timer modal alongside it to simulate real-world Indian payment app webhooks (GPay/PhonePe).
  * **Why Stripe?** It provides best-in-class sandbox environments. Custom credit card inputs violate PCI-compliance out of the box, and Stripe bypasses the heavy KYC requirements needed for Razorpay testing.
* **Mapping SDK: Leaflet.js & OpenStreetMap (OSM)**
  * **Where it is used:** Exclusively inside `buyer-dashboard.html`. The `L.map('map')` instance binds to a container to fetch free map tiles. The `map.flyTo()` function dynamically visually travels across India based on the location keywords entered in the search bar.
  * **Why Leaflet?** An extremely lightweight, open-source library. Setting up Google Maps requires credit card billing and API key generation. Leaflet is free and block-free for rapid prototyping.

---

## Production Trajectory
When moving this prototype to production, the logical path is to take the HTML/Tailwind Code and port it into the **Next.js (`src/app/`)** environment, swap the `db.js` LocalStorage calls with **tRPC or Next.js Server Actions**, and replace the storage engine with **PostgreSQL (via Prisma or Supabase)**.
