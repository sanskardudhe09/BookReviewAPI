
# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, **MongoDB**, and **JWT** for user authentication. This API allows users to manage books and reviews.

---

## 🚀 Project Setup

### 1. Clone and install dependencies
```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
npm init -y
npm install
```

### 2. Create a `.env` File in the Root Directory

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreviews
JWT_SECRET=your_secret_key

💡 Ensure MongoDB is running locally or use MongoDB Atlas connection string for production.
```

### 3. Running the App Locally

```
npm start
The API will run on: http://localhost:5000
```
### 4. Authentication APIs
### 4.1 Signup – POST /api/signup
```API Url: http:localhost:5000/api/signup```
```
Body: 
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}
```

### 4.2 Login – POST /api/login
```
```API Url: http:localhost:5000/api/login```
Body: 
{
  "email": "john@example.com",
  "password": "123456"
}


Response:
{
  "token": "your_jwt_token"
}


🔐 Use this token in Postman headers:
```Authorization: your_jwt_token```
Ensure that the token entered is same as the token received on login of user
```

### 5. Book APIs
### 5.1 Create Books – POST /api/books
```API Url: http:localhost:5000/api/books```
```
Headers:
Authorization: your_jwt_token

Body: 
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction"
}

```

### 5.2 GET ALL Books – GET /api/books
```API Url: http:localhost:5000/api/books```
```
Query Params:
- author=paulo
- genre=fiction
- page=1&limit=10

```






