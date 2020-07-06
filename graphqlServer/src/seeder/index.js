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
    name:
      "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    finished: false,
  },
];

//3
async function main() {
  // todoItems.forEach(async function (todo) {
  //   const newTodo = await prisma.todo.create({
  //     data: {
  //       name: todo.name,
  //     },
  //   });
  // });

  const newTodo = await prisma.todo.create({
    data: {
      name: "todo0",
    },
  });

  const allTodo = await prisma.todo.findMany();
  console.log(allTodo);
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
