const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require('helmet');
const cors = require('cors');
const AppError=require('./utils/AppError');
// const errorHandler=require('./middlewares/errorMiddleware');
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

const booksRoutes = require('./routes/booksRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const authorsRoutes= require('./routes/authorsRoutes');
const categoriesRoutes= require('./routes/categoryRoutes');


dotenv.config({ path: 'config.env' });
const DB_CONNECT = process.env.DB_CONNECT;
mongoose
  .connect(DB_CONNECT)
  .then((conn) => {
    // console.log(conn.connections);
    console.log("DB Connected successfully");
  });

app.use('/books',booksRoutes);
app.use('/reviews',reviewsRoutes);
app.use('/authors', authorsRoutes);
app.use('/categories', categoriesRoutes);

app.all('*', (req, res,next)=> {
  next(new AppError(`couldn\'t find ${req.originalUrl} on this server`,404));
})

app.use((err, req, res, next) => {
  res.status(404).json({ error: err.message });
  });
const PORT = process.env.PORT || 3000;






// app.use(errorHandler);

app.listen(PORT, () => {
  `
    Server is running on port ${PORT} library project`;
});
