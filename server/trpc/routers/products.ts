import { PrismaClient, Products } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

const prisma = new PrismaClient()

export const productsRouter = router({
  getProducts: publicProcedure.query(async () => {
    const products = await prisma.products.findMany()
    if (!products) {
      return {
        type: 'error',
        error: new TRPCError({ message: 'no products', code: 'NOT_FOUND' })
      } as const
    }
    return {
      type: 'ok',
      data: products
    } as const
  }),

  createProduct: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string(),
      description: z.string().nullish(),
      price: z.number(),
      machineId: z.string()
    })satisfies z.Schema<Products>)

})
