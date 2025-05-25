const express = require('express');
const router = express.Router();
const {createReview, updateReview, deleteReview} = require('../controllers/reviewController.js');
const {verifyLoggedInUser} = require('../middleware/authMiddleware.js');

router.post('/books/:id/reviews', verifyLoggedInUser, createReview);
router.put('/:id', verifyLoggedInUser, updateReview);
router.delete('/:id', verifyLoggedInUser, deleteReview);

module.exports = router;