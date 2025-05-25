
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
```API Url: http:localhost:5000/api/login```
```
Body: 
{
  "email": "john@example.com",
  "password": "123456"
}


Response:
{
  "token": "your_jwt_token"
}
```

🔐 Use this token in Postman headers:
```Authorization: your_jwt_token```
```
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
1. author=paulo
2. genre=fiction
3. page=1&limit=10

Response is paginated as per 10 records per page
```

### 5.3 Search Books – GET /api/books/search?q=queryname
```API Url: http:localhost:5000/api/search?q=queryname```
```
Query Params:
1. author=paulo
2. title=fiction

Filters on the basis of author or title provided in query params
```

### 5.4 GET BOOK Details with Reviews – GET /api/books/:id
```API Url: http:localhost:5000/api/books/id```
```
Query Params:
1. page=1&limit=10

Returns
Book info
Paginated reviews
Average rating

Sample Reponse:

{
    "book": {
        "_id": "68331e50401a5d755320659e",
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Self-help",
        "__v": 0
    },
    "avgRatings": 3,
    "reviews": [
        {
            "_id": "683325ba6aed6335845a5da3",
            "user": {
                "_id": "68331a4316a4dec6280a907c",
                "username": "Sanskar"
            },
            "book": "68331e50401a5d755320659e",
            "rating": 3,
            "comment": "Good",
            "createdAt": "2025-05-25T14:14:18.999Z",
            "updatedAt": "2025-05-25T14:14:18.999Z",
            "__v": 0
        }
    ]
}
As in the above response, the api returns the book with the given id along with the review submitted for that 
book and the user details who submitted that review 

Accepts page and limit as query param for pagination
```
### 6. Review APIs
### 6.1 Create Reviews – POST /api/reviews/:bookId/reviews

```Header must have Authorization field with token to use these APIs ensuring only authorised users can create/update/delete reviews```

```API Url: http:localhost:5000/api/reviews/bookId/reviews```
```
Headers:
Authorization: your_jwt_token

Body: 
{
  "rating": 4,
  "comment": "Amazing book!"
}
```

### 6.2 Update Reviews – PUT /api/reviews/:reviewId
```API Url: http:localhost:5000/api/reviews/:reviewId```
```
Headers:
Authorization: your_jwt_token

Body: 
{
  "rating": 5,
  "comment": "Updated comment: Absolutely loved it!"
}

```

### 6.3 Delete Reviews – DELETE /api/reviews/:reviewId
```API Url: http:localhost:5000/api/reviews/:reviewId```
```
Headers:
Authorization: your_jwt_token

```
### 7. 💡 Decisions & Assumptions

```
✅ JWT Authentication secures private routes.

🚫 One user can review a book only once (enforced with a compound index on book + user using MongoDB).

🛡️ Users can only update/delete their own reviews.

📄 Reviews and book listings support pagination.

🔍 Search supports partial matches on title or author.
```
### 8. Database Schema
### 8.1 User Model

```
{
  username: String, // required, unique
  email: String,    // required, unique
  password: String  // hashed using bcrypt
}

```

### 8.2 Book Model

```
{
  title: String,        // required
  author: String,       // required
  genre: String,
}

```

### 8.3 Review Model

```
{
  book: ObjectId,   // reference to Book
  user: ObjectId,   // reference to User
  rating: Number,   // min: 1, max: 5
  comment: String
}

```
```📌 Compound Unique Index: { book: 1, user: 1 } to prevent duplicate reviews.```










