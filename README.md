# 🛒 Cartify – eCommerce Web App

A full-stack eCommerce platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), featuring product listings, a shopping cart, checkout flow, and payment integration.

## ✨ Features

- 🛍️ **Product Catalog** — Browse and search products with category/brand info
- 🔐 **JWT-based Authentication** — Secure login/register with **bcrypt** password hashing
- 🛒 **Shopping Cart** — Add, update, and remove items (persisted in local storage)
- 💳 **Checkout & Payments** — Order placement with shipping details and payment integration (Stripe-ready)
- 🔧 **RESTful CRUD APIs** — Full CRUD for products and users, with admin-only product management
- 📱 **Responsive Frontend** — Built with React and Axios for smooth API integration

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcrypt.js |
| Payments | Stripe |

## 📁 Project Structure

```
cartify/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js     # Register/Login/Profile
│   │   ├── productController.js  # Product CRUD
│   │   └── orderController.js    # Order/checkout logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT protect & admin guard
│   │   └── errorMiddleware.js    # 404 & error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Axios instance with JWT interceptor
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── ProductCard.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── ProductPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── CheckoutPage.js
│   │   │   ├── OrderPage.js
│   │   │   ├── LoginPage.js
│   │   │   └── RegisterPage.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local instance or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/cartify.git
cd cartify
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Stripe key
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```
Frontend runs on `http://localhost:3000`

## 🔑 Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cartify
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/users/register` | Public | Register new user |
| POST | `/api/users/login` | Public | Login & receive JWT |
| GET | `/api/users/profile` | Private | Get logged-in user profile |

### Products
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | Public | List all products (supports `?keyword=`) |
| GET | `/api/products/:id` | Public | Get single product |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Orders
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/orders` | Private | Create new order |
| GET | `/api/orders/myorders` | Private | Get logged-in user's orders |
| GET | `/api/orders/:id` | Private | Get order by ID |
| PUT | `/api/orders/:id/pay` | Private | Mark order as paid |

## 🔒 Authentication Flow

1. User registers or logs in → server returns a **JWT** signed with `JWT_SECRET`
2. Token is stored in the browser's `localStorage`
3. Axios interceptor attaches `Authorization: Bearer <token>` to every subsequent request
4. Protected backend routes verify the token via the `protect` middleware; admin-only routes additionally check `isAdmin` via the `admin` middleware

## 🛣️ Roadmap / Possible Improvements
- Product reviews & ratings
- Admin dashboard for managing orders/users
- Image upload (Cloudinary/S3) instead of static URLs
- Pagination & filtering for product listings
- Unit & integration tests (Jest, Supertest)

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
