# FSP - P9: REST API with JWT Auth, Image Upload & Payment Mockup

A production-ready Node.js/Express REST API featuring JWT authentication, Multer image uploads, payment mockup, and comprehensive data validation.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Upload**: Multer (disk storage)
- **Validation**: express-validator
- **Dev Tool**: Nodemon

## 📁 Project Structure

```
├── src/
│   ├── config/db.js          # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   ├── upload.js          # Multer config
│   │   └── validate.js        # Validation handler
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Product.js         # Product schema
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   └── payment.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   └── payment.routes.js
│   └── validators/
│       ├── auth.validator.js
│       ├── product.validator.js
│       └── payment.validator.js
├── uploads/                   # Uploaded images (gitignored)
├── postman/                   # Postman collection
├── server.js                  # Entry point
├── .env.example
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd "FSP - P9"

# Install dependencies
npm install

# Create uploads directory
mkdir -p uploads

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint               | Access  | Description          |
|--------|------------------------|---------|----------------------|
| POST   | `/api/auth/register`   | Public  | Register new user    |
| POST   | `/api/auth/login`      | Public  | Login & get token    |
| GET    | `/api/auth/me`         | Private | Get current user     |

### Products
| Method | Endpoint               | Access  | Description          |
|--------|------------------------|---------|----------------------|
| POST   | `/api/products`        | Private | Create product       |
| GET    | `/api/products`        | Private | Get all products     |
| GET    | `/api/products/:id`    | Private | Get single product   |
| PUT    | `/api/products/:id`    | Private | Update product       |
| DELETE | `/api/products/:id`    | Private | Delete product       |

### Payments (Mockup)
| Method | Endpoint                        | Access  | Description            |
|--------|---------------------------------|---------|------------------------|
| POST   | `/api/payments/pay`             | Private | Process mock payment   |
| GET    | `/api/payments/:transactionId`  | Private | Get payment status     |

## 🔐 Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## 📋 Request Examples

### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Product (multipart/form-data)
```
POST /api/products
Fields: name, description, price, category
File: image (JPEG/PNG/WebP, max 5MB)
```

### Process Payment
```json
POST /api/payments/pay
{
  "amount": 99.99,
  "cardNumber": "4242",
  "productId": "<product_id>"
}
```

## 🧪 Testing

Import `postman/FSP-P9.postman_collection.json` into Postman to run the full test suite.

## 🌐 Deployment

1. Push code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set environment variables (`MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`)
4. Deploy!

## 📄 License

ISC
