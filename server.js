const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Razorpay=require("razorpay")
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminAuthRouter= require("./routes/admin/admin_auth_routes");
const adminsRouter= require("./routes/common/admins-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const wishlistRouter = require("./routes/shop/wish-routes");
require('dotenv').config();

const commonFeatureRouter = require("./routes/common/feature-routes");
const paymentRouter=require("./routes/payment/payment-route");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT||4000;
app.set("trust proxy", true);
 
app.use(
  cors({
    origin: "https://artisancart.onrender.com",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admins", adminsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/shop/wishlist", wishlistRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/payment",paymentRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
