
const { createSchedule, getBookings } = require("../services/adminService");

// Crear horario
const create = async (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const { court, startTime, endTime } = req.body;

    if (!court || !startTime || !endTime) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const schedule = await createSchedule(court, startTime, endTime);
    return res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};

// Listar reservas
const listBookings = async (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const bookings = await getBookings();
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, listBookings };
