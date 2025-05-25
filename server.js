const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');

dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to database successfully!"))
.catch(err => console.error(err));
const PORT = 5000 || process.env.PORT;

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
