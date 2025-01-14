const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
