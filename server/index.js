import express from "express";
import cors from "cors";

import { getUser } from "./services/userService.js";
import { getHotels } from "./services/hotels/get-hotels.service.js";
import { getLastPackageHotels } from "./src/bdd/hotels/hotels.controller.js";
import { getBookingAvailable } from "./src/bdd/bookings/booking.controller.js";
import { getOpeningsRoom } from "./src/bdd/openings/openings.controller.js";

const app = express();

app.use(cors());

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await getHotels();

    if (hotels) {
      res.status(200).send(hotels);
    }
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
});

app.get("/last-hotels-package", async (req, res) => {
  try {
    const packages = await getLastPackageHotels();

    if (packages) {
      res.status(200).send(packages);
    }
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
});

app.get("/booking/:roomId/:stock", async (req, res) => {
  try {
    const { stock, roomId } = req.params;
    const stockAvailable = await getBookingAvailable({ roomId, stock });

    res.status(200).send(stockAvailable);
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
});

app.get("/openings/:saleId/:roomId/:stock", async (req, res) => {
  try {
    const { saleId, roomId, stock } = req.params;
    const openings = await getOpeningsRoom({ saleId, roomId, stock });

    res.status(200).send(openings);
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
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
