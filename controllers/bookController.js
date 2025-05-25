const Book = require('../models/Book.js');
const Review = require('../models/Review');

module.exports.createBook = async (req, res) => {
    const {title, author, genre} = req.body;
    if(!title || !author){
        return res.status(400).json({message: 'Title and author are required for book!'});
    }
    try{
        const book = new Book({title, author, genre});
        await book.save();
        return res.status(201).json({book, message: 'Book created successfully!'});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
};

module.exports.getBooks = async (req, res) => {
    const {author, genre, page=1, limit=10} = req.query;
    //Default limit for books pagination is 10
    const filter = {};
    if(author){
        filter.author = new RegExp(author, 'i');
    }
    if(genre){
        filter.genre = new RegExp(genre, 'i');
    }
    try {
        const books = await Book.find(filter).skip((page-1)*limit).limit(Number(limit));
        return res.status(200).json({books});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

module.exports.getBookDetails = async (req, res) => {
    const {page=1, limit=5} = req.query;
    //Default limit for reviews pagination is 5
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({message: `Book with the id ${req.params.id} not found!`});
        }
        //Counting how many reviews exists for a specefic book with given id in reviews collection
        const totalReviewsCount = await Review.countDocuments({book: book._id});
        const reviews = await Review.find({book: book._id}).skip((page-1)*limit).
        limit(Number(limit)).populate('user', 'username');
        const avgRatings = totalReviewsCount 
          ? reviews.reduce((sum, i) => sum+i.rating, 0)/reviews.length.toFixed(1) 
          : 0;
        return res.status(200).json({book, avgRatings, reviews});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

module.exports.searchBooks = async (req, res) => {
    const { query } = req.query;
    try {
        const books = await Book.find({
            $or: [
                {title: new RegExp(query, 'i')},
                {author: new RegExp(query, 'i')}
            ]
        });
        return res.status(200).json({books});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};