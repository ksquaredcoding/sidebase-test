import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { publicProcedure, router } from '../trpc'
// TODO cannot use create function...
const prisma = new PrismaClient()

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
      const checkProduct = await getOneProduct(req.input.name)
      if (checkProduct) {
        checkProduct.quantity++
        await req.ctx.prisma.products.update({
          where: {
            id: checkProduct.id
          },
          data: checkProduct
        })
        return checkProduct
      }
      const product = await req.ctx.prisma.products.create({ data: req.input })
      return product
    })

})

async function getOneProduct (productName: string) {
  const product = await prisma.products.findFirst({
    where: {
      name: productName
    }
  })
  if (!product) {
    return
  }
  return product
}
