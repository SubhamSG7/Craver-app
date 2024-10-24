const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
const userRoute = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const staffRoutes = require("./routes/staffRoutes");
const adminScope = require("./routes/scope");
const restaurantRoutes = require("./routes/restaurantRoutes");
const restaurantApi = require("./routes/restaurantApi");
const logoutRoutes = require("./routes/logoutRoutes");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/scope", adminScope);
app.use("/api/get", restaurantApi);
app.use("/api/logout", logoutRoutes);
app.get("/", (req, res) => res.send("Hello Server!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


module.exports=app;