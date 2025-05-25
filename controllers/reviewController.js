const Review = require('../models/Review.js');

module.exports.createReview = async (req, res) => {
    const {rating, comment} = req.body;
    if(!rating){
        return res.status(400).json({message: 'Rating is reuired!'});
    }
    try {
        const review = new Review({user:req.user.id, book: req.params.id, rating, comment});
        await review.save();
        return res.status(201).json({message: 'Review created successfully!'});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

module.exports.updateReview = async (req, res) => {
    if(!req.body){
        return res.status(400).json({message: 'Rating and comment is required for updation!'});
    }
    try {
        const review = await Review.findById(req.params.id);
        if(!review || review.user.toString() !== req.user.id){
            return res.status(403).json({message: 'Unauthorized User..Please login!'});
        }
        review.comment = req.body.comment;
        review.rating = req.body.rating;
        await review.save();
        return res.status(200).json({message: 'Review Updated Successfully', review});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review){
            return res.status(404).json({message: `Review with the given id ${req.params.id} not found!`});
        }
        if(review.user.toString() !== req.user.id){
            return res.status(403).json({message: 'Unauthorised user..Please login!'});
        }
        await review.remove();
        return res.status(200).json({message: 'Review deleted successfully!'});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};