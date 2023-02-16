import { router } from '../trpc'
import { machineRouter } from './machine'
import { productsRouter } from './products'

export const appRouter = router({
  products: productsRouter,
  machine: machineRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
