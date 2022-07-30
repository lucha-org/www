const { PrismaClient } = require("@prisma/client");
const { data } = require("./data.js");
const Prisma = new PrismaClient();

(async () => {
  try {
    await Prisma.wrestler.createMany({ data });
    console.log("Init Payload Added");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await Prisma.$disconnect();
  }
})();
