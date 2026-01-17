# ProductHub - Modern Next.js E-Commerce Platform

ProductHub is a professional, full-stack marketplace application built with **Next.js 15**, **MongoDB**, and **Tailwind CSS**. It offers a premium user experience with a sleek dark mode, real-time cart updates, and robust inventory management.

## 🚀 Key Features

### 🛒 Shopping Experience
- **Interactive Marketplace**: Browse a dynamic list of products with real-time search and category filtering.
- **Product Details**: Deep insights into products with high-quality previews, pricing, and related items.
- **Persistent Favorites**: Save items to your personal wishlist with instant visual feedback (Red Heart) and persistent storage.
- **Advanced Shopping Cart**: Managed client-side state with immediate Navbar badge updates and a dedicated summary page.

### 🔐 User & Order Management
- **Dashboard Overview**: A centralized hub showing activity stats like total orders, spent amount, and active listings.
- **Order Tracking**: Comprehensive history of all past purchases with real-time status indicators (Processing, Shipped, Delivered).
- **Secure Checkout**: Streamlined checkout flow capturing shipping details and processing orders into the database.

### 📦 Seller Tools (CRUD)
- **Product Hub Inventory**: Sellers can view and manage their listed products in a professional table view.
- **Dynamic Updates**: Edit product details (price, category, description) via a smooth modal interface.
- **Inventory Control**: Add new products with multi-step validation or remove existing ones with secure confirmation.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB Atlas
- **State & Storage**: React Hooks, LocalStorage, Context API
- **Feedback**: SweetAlert2 (Toasts & Modals), React Icons
- **Auth Simulation**: Cookie-based session management for demo purposes

## 📋 Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB Atlas account (for database connection)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/saifurrahmanctg/product-hub.git
   cd product-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=producthub-db
   DB_COLLECTION=products
   JWT_SECRET=your_jwt_secret
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Credentials
For demo purposes, use the following credentials to access protected features:
- **Email**: `demo@user.com`
- **Password**: `password123`

## 👤 Author
**Saifur Rahman**
- GitHub: [@saifurrahmanctg](https://github.com/saifurrahmanctg)
- Project: [ProductHub](https://github.com/saifurrahmanctg/product-hub)

---
Developed with ❤️ by the ProductHub Team.
