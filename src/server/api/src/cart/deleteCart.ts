import { protectedProcedure } from "../../trpc";
import { z } from "zod";

export const deleteCart = protectedProcedure
  .input(
    z.object({
      cartId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { cartId } = input;

    await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  });
