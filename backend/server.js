const express = require("express");
const transportatoriRoutes = require('./src/transportatori/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello World!");
});

app.use("/api/transportatori",transportatoriRoutes);

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
  });