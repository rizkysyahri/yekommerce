import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { InventoryStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const updateCart = protectedProcedure
  .input(
    z.object({
      cartId: z.string(),
      productVariantId: z.string(),
      quantity: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { cartId, productVariantId, quantity } = input;

    return await prisma.$transaction(async (tx) => {
      const productStock = await tx.inventory.count({
        where: {
          status: InventoryStatus.AVAILABLE,
          productVariantId,
          quantity: {
            gte: quantity,
          },
        },
      });

      if (!productStock) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "insufficient stock"
        });
      }

      const cart = await tx.cart.update({
        where: {
          id: cartId,
        },
        data: {
          quantity,
        },
      });

      return cart;
    });
  });
