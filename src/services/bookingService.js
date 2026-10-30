
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

// Crear reserva
const createBooking = async (userId, date, scheduleId) => {
  const existing = await prisma.booking.findFirst({
    where: {
      date: new Date(date),
      scheduleId
    }
  });

  if (existing) {
    const error = new Error("El horario ya está ocupado");
    error.statusCode = 400;
    throw error;
  }

  return prisma.booking.create({
    data: {
      date: new Date(date),
      userId,
      scheduleId
    }
  });
};

// Consultar reserva
const getBooking = async (id) => {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true }
      },
      schedule: true
    }
  });
};

// Actualizar reserva
const updateBooking = async (id, date, scheduleId) => {
  const existing = await prisma.booking.findFirst({
    where: {
      date: new Date(date),
      scheduleId,
      NOT: { id }
    }
  });

  if (existing) {
    const error = new Error("El horario ya está ocupado");
    error.statusCode = 400;
    throw error;
  }

  return prisma.booking.update({
    where: { id },
    data: {
      date: new Date(date),
      scheduleId
    }
  });
};

// Eliminar reserva
const deleteBooking = async (id) => {
  return prisma.booking.delete({
    where: { id }
  });
};

module.exports = {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking
};
