
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

// Crear un horario
const createSchedule = async (court, startTime, endTime) => {
  return await prisma.schedule.create({
    data: {
      court,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    }
  });
};

// Consultar todas las reservas
const getBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      schedule: true
    }
  });
};

module.exports = { createSchedule, getBookings };
