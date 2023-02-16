import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const machineRouter = router({
  getmachine: publicProcedure.query(async (req) => {
    const machine = await req.ctx.prisma.vendingMachine.findMany()
    if (!machine) {
      return {
        type: 'error',
        error: new TRPCError({ message: 'no machine', code: 'NOT_FOUND' })
      } as const
    }
    return {
      type: 'ok',
      data: machine
    } as const
  }),

  createMachine: publicProcedure
    .mutation(async (req) => {
      const machine = await req.ctx.prisma.vendingMachine.create({
        data: {
          availableChange: 500,
          productSlots: 12
        }
      })
      return machine
    })

})
