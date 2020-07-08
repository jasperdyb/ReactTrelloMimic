// 1
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//3
async function main() {
  await prisma.todo.deleteMany();
}

//4
main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.disconnect();
  });
