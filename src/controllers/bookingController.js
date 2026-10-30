
const bookingService = require("../services/bookingService");

const create = async (req, res, next) => {
  try {
    const { date, scheduleId } = req.body;

    if (!date || !Number.isInteger(scheduleId) ||
        scheduleId < 1 || isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Datos invalidos" });
    }

    const booking = await bookingService.createBooking(
      req.user.id,
      date,
      scheduleId
    );

    return res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBooking(Number(req.params.id));
    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { date, scheduleId } = req.body;

    if (!date || !Number.isInteger(scheduleId) ||
        scheduleId < 1 || isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Datos invalidos" });
    }

    const booking = await bookingService.updateBooking(
      Number(req.params.id),
      date,
      scheduleId
    );

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await bookingService.deleteBooking(Number(req.params.id));
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getById, update, remove };
