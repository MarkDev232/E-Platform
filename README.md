# E-Platform
# 🏋️‍♂️ FitnessBuddies E-commerce Platform

FitnessBuddies is a multi-role e-commerce application built using **Laravel (PHP)** for the backend and **React (TypeScript) + Inertia.js** for the frontend. It supports three main types of users:

- **Admin**
- **Seller**
- **Customer**

---

## 🚦 User Roles and Responsibilities

### 👑 Admin

**Purpose**: Platform owner or staff managing all activity across the system.

#### 🧩 Dashboard Features
- Total users, sales, orders
- Product and seller approval requests
- Reported issues/disputes
- Platform-wide analytics
- System logs and activity

#### 🔐 Profile Fields
- Name & email
- Role type (superadmin, staff)
- Login history

#### 🛠 Permissions
- View, approve, suspend any user
- Manage product categories and site content
- Access full transaction history and system logs
- Send system-wide announcements

---

### 🛍 Seller

**Purpose**: Vendors who sell their fitness-related products on the platform.

#### 🧩 Dashboard Features
- My Products (create, edit, delete)
- Orders (pending, shipped, delivered)
- Sales performance charts
- Payout balance & history
- Customer reviews and questions

#### 🔐 Profile Fields
- Store name, contact info
- Bank/GCash/PayPal details
- Store logo/banner
- Verification status

#### 🛠 Permissions
- Manage own products and inventory
- Track and fulfill orders
- Receive and respond to customer reviews
- View earnings and payout reports

---

### 🧑‍🤝‍🧑 Customer

**Purpose**: Buyers who browse and purchase fitness products.

#### 🧩 Dashboard Features
- Recent and past orders
- Order tracking
- Wishlist and favorites
- Personalized recommendations
- Cart overview

#### 🔐 Profile Fields
- Full name and email
- Address book
- Payment methods
- Profile picture

#### 🛠 Permissions
- Browse and purchase products
- Track orders and cancel if applicable
- Leave product reviews
- Manage profile and shipping info

---

## 🧱 Tech Stack

| Layer       | Tech                    |
|-------------|--------------------------|
| Frontend    | React + TypeScript       |
| Backend     | Laravel (PHP 9.x)        |
| Middleware  | Inertia.js               |
| Styling     | Tailwind CSS             |
| Database    | MySQL / MariaDB          |
| Auth        | Laravel Breeze / Sanctum |

---

## 📁 Suggested Folder Structure

### Backend (Laravel)

---

## 📌 Notes

- All roles use the same layout system with custom breadcrumbs and Inertia pages.
- Placeholder patterns are used for consistent UI during loading or empty states.
- Dashboard components are extendable with real-time data or charts.
- Admins can see and control everything; sellers are limited to their own data; customers manage only their profile and orders.

---

## 💡 Future Enhancements

- Role-based notification system
- Chat between customer and seller
- In-app reporting and analytics
- Mobile app support

---

## 👤 Author

Developed by Mark Francis Sauquillo  
Contact: mark.sauquillo4@email.com



