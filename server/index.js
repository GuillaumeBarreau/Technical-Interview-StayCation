import express from "express";
import cors from "cors";

import { getUser } from "./services/userService.js";
import { getAllHotels } from "./services/hotelService.js";

const app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await getAllHotels();
    if (hotels) {
      res.status(200).send(hotels);
    }
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  res.json("Hello World!");
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await getUser(req.params.id);

    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
});

app.listen(9000, function () {
  console.log("Example app listening on port 9000!");
});
