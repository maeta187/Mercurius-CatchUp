import Fastify from 'fastify'
import mercurius, { IResolvers } from 'mercurius'
import { codegenMercurius, gql } from 'mercurius-codegen'

const fastify = Fastify({
  logger: true
})

const schema = gql`
  type Query {
    hello(greetings: String!): String!
  }
`

const resolvers: IResolvers = {
  Query: {
    hello: async (_, { greetings }) => {
      return `Hello ${greetings}`
    }
  }
}

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true
})

codegenMercurius(fastify, {
  targetPath: './src/types/generated.ts'
}).catch(console.error)

// Then it will automatically generate the file,
// and without doing anything special,
// the resolvers are going to be typed,
// or if your resolvers are in different files...

const PORT = 8000

fastify.listen({ port: PORT }, (err) => {
  if (err) throw err
  console.log(`Server is now running on http://localhost:${PORT}//graphiql#`)
})
