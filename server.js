const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")
const errorHandle = require("./middleware/errorHandling");

const app = express();
const PORT = process.env.PORT || 5002;

connectDb()

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use(errorHandle)

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
