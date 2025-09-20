import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
// import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

//middlewares
// ...existing code...
const allowedOrigins = [
  'http://localhost:3000',
  'https://devops-project-iota.vercel.app'
  
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// ...existing code...
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'https://devops-project-iota.vercel.app',
//     'https://codelance-akshat.netlify.app'
//   ],
//   credentials: true
// }));
// ...existing code...
// app.use(cors({
//   origin: true,
//   credentials: true
// }));
// ...existing code...
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
app.use(express.json());
app.use(cookieParser());

//Api routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
// app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  connectDB();
  console.log("Started");
});
