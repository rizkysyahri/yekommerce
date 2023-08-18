
interface Cart {
  id: string;
  quantity: number;
  deletedAt: Date | null;
  checkoutAt: Date | null;
  productVariantId: string;
  createdAt: Date;
  userId: string;
}
