# Backend Integration Setup Guide

## Prerequisites

1. **MongoDB Database**: You need a MongoDB database. You can use:
   - Local MongoDB installation
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string and JWT secret:

```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**For MongoDB Atlas:**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
- Replace `your_mongodb_connection_string_here` with your actual connection string

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/nextjs-ecommerce
```

### 2. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install --legacy-peer-deps
```

### 3. Seed the Database

Before running the app, you need to seed the database with initial products.

**Important:** You must create an admin user first to access the seed endpoint.

#### Option A: Create Admin User Manually in MongoDB

Connect to your MongoDB database and create an admin user:

```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash "admin123"
  role: "admin",
  createdAt: new Date()
})
```

#### Option B: Register and Update Role

1. Start the development server: `npm run dev`
2. Go to http://localhost:3001/register
3. Create an account
4. In MongoDB, update the user's role to "admin":
   ```javascript
   db.users.updateOne(
     { email: "your@email.com" },
     { $set: { role: "admin" } }
   )
   ```

#### Seed Products

Once you have an admin account:

1. Login at http://localhost:3001/login with your admin credentials
2. Navigate to http://localhost:3001/api/products/seed
3. You should see: `{"success":true,"message":"Seeded X products successfully"}`

### 4. Run the Development Server

```bash
npm run dev
```

Visit http://localhost:3001

## Features

### User Features
- ✅ User registration and login (JWT authentication)
- ✅ Browse products from MongoDB database
- ✅ Add items to cart
- ✅ Checkout with shipping address
- ✅ UPI payment page with QR code
- ✅ Order history (stored in database)

### Admin Features
- ✅ Protected admin panel (requires admin role)
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ View inventory

## Testing the System

### 1. Test User Registration
1. Go to http://localhost:3001/register
2. Create a new account
3. You should be automatically logged in and redirected to home

### 2. Test Shopping Flow
1. Browse products on the home page
2. Add items to cart
3. Go to cart and proceed to checkout
4. Fill in shipping address
5. Click "Proceed to Payment"
6. You'll be redirected to the UPI payment page
7. Enter a mock transaction ID and confirm

### 3. Test Admin Panel
1. Login with admin credentials
2. Go to http://localhost:3001/admin
3. Try adding, editing, or deleting products

## Troubleshooting

### "Please define the MONGODB_URI environment variable"
- Make sure `.env.local` exists and contains `MONGODB_URI`
- Restart the development server after creating `.env.local`

### "Authentication required" on admin page
- Make sure you're logged in
- Check that your user has `role: "admin"` in MongoDB

### Products not loading
- Make sure you've seeded the database
- Check MongoDB connection
- Check browser console for errors

### "Failed to create order"
- Make sure you're logged in
- Check that products exist in the database
- Verify MongoDB connection

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/inventory` - Get all products
- `POST /api/inventory` - Create product (admin only)
- `PUT /api/inventory` - Update product (admin only)
- `DELETE /api/inventory` - Delete product (admin only)
- `GET /api/products/[id]` - Get single product
- `GET /api/products/seed` - Seed database (admin only)

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get specific order

## Security Notes

- JWT tokens are stored in HTTP-only cookies
- Passwords are hashed with bcrypt
- Admin routes are protected with middleware
- Change `JWT_SECRET` in production to a strong random string
