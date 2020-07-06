const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `React Todo`,
    list: async (parent, args, context) => {
      return context.prisma.todo.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newTodo = context.prisma.todo.create({
        data: {
          name: args.name,
          finished: false,
        },
      });
      return newTodo;
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

server.start(() => console.log(`Server is running on http://localhost:4000`));
