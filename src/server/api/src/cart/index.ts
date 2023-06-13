import { createTRPCRouter } from "../../trpc";
import { getCart } from "./getCart";
import { addToCart } from "./addToCart";
import { updateCart } from "./updateCart";
import { deleteCart } from "./deleteCart";

export const cartRouter = createTRPCRouter({
  getCart,
  addToCart,
  updateCart,
  deleteCart,
});
