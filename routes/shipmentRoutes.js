
const express = require("express");
const router = express.Router();

const controller = require("../controllers/shipmentController");

router.get("/", controller.getShipments);
router.post("/", controller.createShipment);
router.put("/:id", controller.updateShipment);

module.exports = router;