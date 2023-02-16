import { router } from '../trpc'
import { productsRouter } from './products'

export const appRouter = router({
  products: productsRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
