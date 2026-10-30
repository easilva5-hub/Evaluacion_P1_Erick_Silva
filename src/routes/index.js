const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");

const router = Router();

router.use("/auth", authRouter);
// Monta aquí tus routers de los hitos 2, 3 y 4
router.use("/admin", adminRouter);

module.exports = router;
