
const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");
const adminController = require("../controllers/adminController");

const router = Router();

router.use(authenticateToken);

router.post("/schedules", adminController.create);
router.get("/bookings", adminController.listBookings);

module.exports = router;
