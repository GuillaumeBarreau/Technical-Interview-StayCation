import express from "express";
import cors from "cors";

import { usersControllers } from "./src/bdd/users/users.controller.js";
import { hotelsControllers } from "./src/bdd/hotels/hotels.controller.js";
import { bookingsControllers } from "./src/bdd/bookings/bookings.controller.js";
import { openingsControllers } from "./src/bdd/openings/openings.controller.js";

const app = express();

app.use(cors());

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
    const stockAvailable = await bookingsControllers.getBookingAvailable({
      roomId,
      stock,
    });

    res.status(200).send(stockAvailable);
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
});

app.get("/openings/:saleId/:roomId", async (req, res) => {
  try {
    const { saleId, roomId } = req.params;
    const openings = await openingsControllers.getOpeningsRoom({
      saleId,
      roomId,
    });

    res.status(200).send(openings);
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await usersControllers.getUserById(req.params.id);

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
