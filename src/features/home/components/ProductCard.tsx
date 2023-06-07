// import type { ProductVariant } from "@prisma/client";
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
  // productVariants: ProductVariant[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  productName,
  slug,
  // productVariants,
}) => {
  return (
    <div className="w-60 space-x-4 md:space-y-5">
      <div className="relative w-full" style={{ paddingBottom: "75%" }}>
        <img src={image} alt={productName} className="absolute object-cover top-0 left-0 w-full h-full rounded-md md:rounded-xl" />
      </div>
      <p className="mt-5 font-medium">{productName}</p>
      <p className="mt-1">{toRupiah(price)}</p>
      <div className="mx-auto mt-3 flex items-center justify-center ">
        <button className="btn-block btn rounded-md">Add To Cart</button>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Link href={`/product/${slug}`} className="underline" passHref>
          Details
        </Link>
      </div>
    </div>
  );
};
