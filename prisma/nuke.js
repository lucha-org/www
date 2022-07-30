const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

(async () => {
  try {
    await Prisma.wrestler.deleteMany();
  } catch (error) {
    console.log(error);
  }
})();
