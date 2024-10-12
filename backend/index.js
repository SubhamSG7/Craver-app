const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const locationRoutes = require("./routes/locationRoutes");
const cuisineRoutes = require("./routes/cuisineRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoute = require("./routes/userRoutes");
const connectDB = require("./config/database");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use("/api/locations", locationRoutes);
app.use("/api/cuisines", cuisineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoute);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
