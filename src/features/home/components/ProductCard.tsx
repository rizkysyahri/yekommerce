import { ProductVariant } from "@prisma/client";
import Link from "next/link";
import * as React from "react";
import { toRupiah } from "~/utils/format";

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
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-2">
      <div className="w-60">
        <img src={image} alt={productName} className="rounded-xl" />
        <p className="mt-5 font-medium">{productName}</p>
        <p className="mt-1">{toRupiah(price)}</p>
        <div className="flex items-center justify-center mt-3">
          <button className="btn-block btn rounded-md">Add To Cart</button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Link href="" className="underline">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
