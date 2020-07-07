// 1
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//dummy
const todoItems = [
  {
    name: "todo1",
    finished: false,
  },
  {
    name: "todo2",
    finished: false,
  },
  {
    name: "todo3",
    finished: false,
  },
  {
    name: "todo4",
    finished: false,
  },
];

//3
async function main() {
  await prisma.todo.deleteMany();

  for (let i = 0; i < todoItems.length; i++) {
    await prisma.todo.create({
      data: {
        name: todoItems[i].name,
        finished: false,
      },
    });
  }
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
