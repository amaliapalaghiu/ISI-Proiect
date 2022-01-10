const express = require("express");
const cors = require("cors");
const transportatoriRoutes = require('./src/transportatori/routes');
const userRoutes = require('./src/users/routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello World!");
});

app.use("/api/transportatori",transportatoriRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
  });