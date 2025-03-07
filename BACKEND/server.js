const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sequelize, connectDB } = require("./config/db");
require("dotenv").config();

const DetailsRoutes = require("./routes/exerciseRoutes");  // ✅ Ensure correct route import

const app = express();

// ✅ Database Connection
connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Routes
app.use("/api/details", DetailsRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }) // Change `true` to `false` to avoid data loss
    .then(() => {
        console.log("MySQL Tables synced");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("Sequelize sync error:", err));
