import { productRouter } from "./src/products";
import { cartRouter } from "./src/cart";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  cart: cartRouter,
  // address: addressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
