# Marketplace MVP (React + Vite)

This is the front-end MVP for the future PHP-backend Marketplace project. It currently relies on a mocked REST API via `json-server`.

## Features
- **Public Storefront:** Browse products, view image galleries, and add to cart.
- **Borrow/Loans:** Request a product as a loan instead of purchasing.
- **Sales & Checkout:** Apply discount codes, calculate tax dynamically, and check out (generates a mock receipt).
- **Returns:** Users can initialize a return by inputting receipt info and product condition.
- **Admin Dashboard:** Review and approve/reject loan requests. View dynamically calculated top/lowest selling products via Reports page.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Applications
You need to run both the Vite development server and the mock json-server api in parallel. This project is configured with concurrent scripts, or you can run them manually depending on the OS setup.

In Terminal 1 (Mock API):
```bash
npm run server
```

In Terminal 2 (React App):
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

## Replacing Mock API with PHP Backend

Presently, data is seeded from `/src/db/db.json` and hosted locally by `json-server` on `localhost:3000`.

To hook this React front-end up to your future PHP backend:

1. **Update API Client:** Open `src/api/client.js` and change `baseURL: 'http://localhost:3000'` to point towards your local or production PHP rest endpoints (e.g. `http://localhost/my-market-api/v1`).
2. **Setup PHP Endpoints:** Ensure your PHP codebase accepts and returns `application/json` formatting matching the seed models inside `db.json`. Required routes include:
    - `GET /products`
    - `GET /products/:id`
    - `GET /images?product_id=:id`
    - `GET /loans` & `POST /loans` & `PUT /loans/:id`
    - `GET /receipts` & `POST /receipts`
    - `POST /returns`
3. Restructure image URLs on your PHP backend to point out directly from a valid relative or absolute asset path payload.