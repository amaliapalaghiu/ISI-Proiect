const express = require("express");
const cors = require("cors");
const transportatoriRoutes = require('./src/transportatori/routes');
const userRoutes = require('./src/users/routes');
const cereriRoutes = require('./src/cereri/routes');
const expeditoriRoutes = require('./src/expeditori/routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello World!");
});

app.use("/api/transportatori",transportatoriRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cereri", cereriRoutes);
app.use("/api/expeditori", expeditoriRoutes);

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
  });