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

  let order = 0;

  for (let i = 0; i < todoItems.length; i++) {
    await prisma.todo.create({
      data: {
        name: todoItems[i].name,
        finished: false,
        order: order,
      },
    });

    order += 1;
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
