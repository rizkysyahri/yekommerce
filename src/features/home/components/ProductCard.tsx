import type { ProductVariant } from "@prisma/client";
import Link from "next/link";
import * as React from "react";
import { toRupiah } from "~/utils/format";
import { AddToCartModal } from "./AddToCartModal";

interface ProductCardProps {
  onclick?: () => void;
  productName: string;
  price: number;
  rating?: number;
  image: string;
  slug: string;
  productVariants: ProductVariant[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  productName,
  slug,
  productVariants,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="aspect-h-4 aspect-w-5 w-full overflow-hidden">
        <img
          src={image}
          alt={productName}
          className="rounded-md object-cover md:rounded-xl"
        />
      </div>
      <p className="mt-3 font-medium sm:text-left md:text-left">{productName}</p>
      <p className="mt-1 md:text-left">{toRupiah(price)}</p>
      <div className="mt-3 flex items-center justify-center">
        <AddToCartModal
          isOpen={isOpen}
          onClose={onClose}
          productVariants={productVariants}
          productName={productName}
        />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Link href={`/product/${slug}`} className="underline">
          Details
        </Link>
      </div>
    </div>
  );
};
