const express = require('express');
const router = express.Router();
const {createBook, getBooks, getBookDetails, searchBooks} = require('../controllers/bookController.js');
const {verifyLoggedInUser} = require('../middleware/authMiddleware.js');

router.post('/', verifyLoggedInUser, createBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookDetails);


module.exports = router;