import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const productsRouter = router({
  getProducts: publicProcedure.query(async (req) => {
    const products = await req.ctx.prisma.products.findMany()
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
      name: z.string(),
      description: z.string(),
      price: z.number(),
      machineId: z.string()
    }))
    .mutation(async (req) => {
      const product = await req.ctx.prisma.products.create({ data: req.input })
      return product
    })

})
