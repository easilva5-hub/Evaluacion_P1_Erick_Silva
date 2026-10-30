
const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");
const authorizeBooking = require("../middlewares/authorizeBooking");
const bookingController = require("../controllers/bookingController");

const router = Router();

router.use(authenticateToken);

router.post("/", bookingController.create);

router.get("/:id", authorizeBooking, bookingController.getById);

router.put("/:id", authorizeBooking, bookingController.update);

router.delete("/:id", authorizeBooking, bookingController.remove);

module.exports = router;
