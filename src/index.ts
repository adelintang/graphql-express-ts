import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import 'dotenv/config'
import cors from 'cors'
import {
  authentication,
  errorHandler,
  type IRequest,
  customLogger,
  formattedError
} from "./middlewares"
import routes from './routes'
import { schemas } from './graphql'
import { IContext } from './context'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

const app = express()
app.use(express.json())
app.use(cors())
app.use(customLogger)


const apolloServer = new ApolloServer({
  schema: schemas,
  context: ({ req }: { req: IRequest }): IContext => ({ user: req.user }),
  introspection: process.env.NODE_ENV === 'development',
  formatError: formattedError
})

const startServer = async () => {
  await apolloServer.start()
  app.use('/graphql', authentication)
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  app.use('/', routes)
  app.use(errorHandler)
}

startServer()

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`)
  console.log(`🚀 Graphql running at http://${HOST}:${PORT}${apolloServer.graphqlPath}`);
  // console.log(`🚀 Graphql running at https://studio.apollographql.com/sandbox/explorer`);
})