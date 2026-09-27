require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const auth = require("./middleware/auth");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/shipments", require("./routes/shipmentRoutes"));




app.get("/", (req, res) => {
    res.send("Ecommerce MVP API is running");
});

app.get("/health", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            status: "OK",
            database: "Connected",
            service: "ecommerce-mvp"
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            database: "Disconnected"
        });
    }
});

app.get("/api/profile", auth, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});