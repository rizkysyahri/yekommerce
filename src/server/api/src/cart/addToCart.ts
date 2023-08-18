import { InventoryStatus } from "@prisma/client";
import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const addToCart = protectedProcedure
  .input(
    z.object({
      productVariantId: z.string(),
      quantity: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { prisma, session } = ctx;
    const { productVariantId, quantity } = input;

    await prisma.$transaction(async (tx) => {
      // 1. Check if product stock is enough
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
          message: "insufficient stock",
        });
      }

      // 2. Check if product is in cart
      const cartByProductId : Cart | null = await tx.cart.findFirst({   
        where: {
          productVariantId,
          deletedAt: null,
          checkoutAt: null,
          userId: session.user.id,
        },
      });

      // 3. If product is in the cart, increment the quantity
      if (cartByProductId) {
        await tx.cart.update({
          data: {
            quantity: {
              increment: quantity,
            },
          },
          where: {
            id: cartByProductId.id,
          },
        });
      } else {
        // 4.Else, create a new cart
        await tx.cart.create({
          data: {
            productVariantId,
            quantity,
            userId: session.user.id,
          },
        });
      }
    });
  });
