import * as React from "react";
import type { ProductVariant } from "@prisma/client";
import { api } from "~/utils/api";
import { toast, ToastContainer } from "react-toastify";
import { ProductVariantRadioCart } from "./ProductVariantRadioCart";
import { serializeAddToCartError } from "~/features/cart/utils/serializeAddToCartError";

import "react-toastify/dist/ReactToastify.css";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productVariants: ProductVariant[];
  productName: string;
  checked: boolean;
  isLoading?: boolean;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  onClose,
  productVariants,
  productName,
}) => {
  const [selectedVariant, setSelectedVariant] =
    React.useState<ProductVariant | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { refetch: refetchCart } = api.cart.getCart.useQuery();

  const { mutate, isLoading } = api.cart.addToCart.useMutation({
    onSuccess: async () => {
      await refetchCart();
      toast.success("Produk dimasukkan ke keranjang anda", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        draggable: true,
        theme: "light",
      });
    },
    onError: (error) => {
      const errorMessage = serializeAddToCartError(error.message);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  const renderVariants = () => {
    return productVariants.map((productVariant) => {
      return (
        <ProductVariantRadioCart
          key={productVariant.id}
          price={productVariant.price}
          variantLabel={productVariant.label}
          selected={selectedVariant === productVariant}
          onChange={() => setSelectedVariant(productVariant)}
        />
      );
    });
  };

  // const handleAddToCart = () => {
  //   if (selectedVariant) {
  //     mutate({
  //       productVariantId: selectedVariant?.id as string,
  //       quantity: 1,
  //     });
  //   }
  // };

  return (
    <>
      <button className="btn w-full rounded-md" onClick={() => setIsOpen(true)}>
        Add To Cart
      </button>
      <dialog
        className="modal backdrop-blur-sm"
        open={isOpen}
        onClose={onClose}
      >
        <form method="dialog" className="modal-box">
          <button
            className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => {
              onClose();
              setIsOpen(false);
            }}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Pilih Variant {productName}</h3>
          <div className="mt-3 w-full">
            <div className="grid grid-rows-2 gap-2">{renderVariants()}</div>
          </div>
          <div className="modal-action">
            <button
              className="btn rounded-md bg-red-500 text-white"
              onClick={() => {
                onClose();
                setIsOpen(false);
              }}
            >
              Close
            </button>
            <button
              className="btn rounded-md"
              disabled={isLoading}
              onClick={() =>
                mutate({
                  productVariantId: String(selectedVariant?.id),
                  quantity: 1,
                })
              }
            >
              Tambahkan ke keranjang
            </button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {/* Same as */}
            <ToastContainer />
          </div>
        </form>
      </dialog>
    </>
  );
};
