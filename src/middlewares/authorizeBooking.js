
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const authorizeBooking = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    const booking = await prisma.booking.findUnique({
      where: { id }
    });

    if (!booking) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    if (booking.userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    req.booking = booking;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizeBooking;
