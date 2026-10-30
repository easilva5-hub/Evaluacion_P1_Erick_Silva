
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Eliminar registros en orden
  await prisma.booking.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.user.deleteMany();

  // Cifrar contraseñas con bcrypt costo 10
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  // Crear administrador
  const admin = await prisma.user.create({
    data: {
      name: "Paulo Galarza",
      email: "paulo.galarza@example.com",
      password: adminPassword,
      role: "ADMIN"
    }
  });

  // Crear mi usuario
  const user = await prisma.user.create({
    data: {
      name: "Erick Alejandro Silva Culqui",
      email: "easilva5@espe.edu.ec",
      password: userPassword,
      role: "USER"
    }
  });



  const schedule1 = await prisma.schedule.create({
    data: {
      court: "Pádel 2",
      startTime: new Date("2026-11-17T08:00:00Z"),
      endTime: new Date("2026-11-17T10:00:00Z")
    }
  });

  const schedule2 = await prisma.schedule.create({
    data: {
      court: "Vóley 3",
      startTime: new Date("2026-11-17T10:00:00Z"),
      endTime: new Date("2026-11-17T12:00:00Z")
    }
  });


  await prisma.booking.create({
    data: {
      date: new Date("2026-11-17T00:00:00Z"),
      user: {
        connect: { id: user.id }
      },
      schedule: {
        connect: { id: schedule1.id }
      }
    }
  });

  await prisma.booking.create({
    data: {
      date: new Date("2026-11-17T00:00:00Z"),
      user: {
        connect: { id: user.id }
      },
      schedule: {
        connect: { id: schedule2.id }
      }
    }
  });

  console.log("Seed ejecutado correctamente");
  console.log("Administrador:", admin.email);
  console.log("Usuario:", user.email);
  console.log("Horarios: Pádel 2 y Vóley 3");
  console.log("Reservas creadas: 2");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
