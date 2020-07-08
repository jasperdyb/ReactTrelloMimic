const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `React Todo`,
    list: async (parent, args, context) => {
      return context.prisma.todo.findMany({
        orderBy: { order: "asc" },
      });
    },
  },
  Mutation: {
    addTodo: async (parent, args, context, info) => {
      const newTodo = await context.prisma.todo.create({
        data: {
          name: args.name,
          order: args.order,
          finished: false,
        },
      });
      return newTodo;
    },
    updateTodoName: async (parent, args, context, info) => {
      const id = Number(args.id);

      if (args.name) {
        const updatedTodo = await context.prisma.todo.update({
          where: { id: id },
          data: {
            name: args.name,
          },
        });
        return updatedTodo;
      }
    },
    updateListOrder: async (parent, args, context, info) => {
      for (let i = 0; i < args.newOrder.length; i++) {
        const todo = args.newOrder[i];
        await context.prisma.todo.update({
          where: { id: Number(todo.id) },
          data: {
            order: Number(todo.order),
          },
        });
      }

      return context.prisma.todo.findMany({
        orderBy: { order: "asc" },
      });
    },
    deleteTodo: async (parent, args, context, info) => {
      const id = Number(args.id);
      const deleteTodo = await context.prisma.todo.delete({
        where: { id: id },
      });
      return deleteTodo;
    },
  },
};

// 3
const prisma = new PrismaClient();
const server = new GraphQLServer({
  typeDefs: "./graphqlServer/src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});

server.start(() =>
  console.log(`GraphQL Server is running on http://localhost:4000`)
);
