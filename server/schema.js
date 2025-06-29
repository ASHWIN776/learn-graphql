import { users } from "./db.js";

export const typeDefs = `#graphql
  type User{
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Query{
    users: [User!],
    user(id: ID!): User
  }

  type Mutation{
    user(name: String!, email: String!, age: Int!): User!,
    deleteUser(id: ID!): User!
  }
`

export const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find(user => user.id === args.id)
  },
  Mutation: {
    user: (_, args) => {
      const newUser = {
        id: `${users.length + 1}`,
        name: args.name,
        email: args.email,
        age: args.age
      }

      users.push(newUser)
      return newUser
    },
    deleteUser: (_, args) => {
      const userIndex = users.findIndex(user => user.id === args.id)
      if (userIndex === -1) {
        throw new Error("User not found")
      }
      const deletedUser = users.splice(userIndex, 1)[0]
      users.forEach((user, index) => {
        user.id = `${index + 1}`
      })
      return deletedUser
    } 
  }  
};
