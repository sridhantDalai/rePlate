const express = require('express');
const cookieParser = require('cookie-parser');
const cors=require('cors')
require("dotenv").config();

const userRouter=require('./routes/user.route.js');
const postRouter=require('./routes/post.route.js');
const postFoodRouter = require('./routes/postFood.route.js');

const authMiddleware = require('./middleware/auth.middleware.js');


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// THEN others
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connect database
const connectDB=require('./db.js')
connectDB();

//cors



app.use('/user',userRouter);
app.use('/post',authMiddleware,postRouter);
app.use('/postFood',postFoodRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`);
})
