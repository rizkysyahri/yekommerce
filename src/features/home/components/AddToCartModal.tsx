import * as React from "react";
import type { ProductVariant } from "@prisma/client";
// import { api } from "~/utils/api";
// import { toast } from "react-toastify";
import { ProductVariantRadioCart } from "./ProductVariantRadioCart";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productVariants: ProductVariant[];
  productName: string;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  onClose,
  productVariants,
  productName,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const { refetch: refetchCart } = api.cart.getCart.useQuery();

  // const { mutate, isLoading } = api.cart.addToCart.useMutation({
  //   onSuccess: async () => {
  //     await refetchCart();
  //     toast.success("Berhasil menambahkan ke keranjang", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error("Gagal menambahkan ke keranjang", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   },
  // });

  const renderVariants = () => {
    return productVariants.map((productVariant) => {
      return (
        <ProductVariantRadioCart
          key={productVariant.id}
          price={productVariant.price}
          variantLabel={productVariant.label}
        />
      );
    });
  };

  return (
    <>
      <button className="btn rounded-md w-full" onClick={() => setIsOpen(true)}>
        Add To Cart
      </button>
      <dialog className="modal" open={isOpen} onClose={onClose}>
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
          <div className="mt-3">
            <div className="grid grid-rows-2">{renderVariants()}</div>
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
            <button className="btn rounded-md ">Tambahkan ke keranjang</button>
          </div>
        </form>
      </dialog>
    </>
  );
};
