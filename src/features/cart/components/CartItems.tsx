import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useDebounce } from "use-debounce";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { serializeAddToCartError } from "../utils/serializeAddToCartError";
import { toRupiah } from "~/utils/format";

interface CartItemProps {
  productName: string;
  productImage: string;
  price: number;
  productVariantName: string;
  productVariantId: string;
  quantity: number;
  selected: boolean;
  slug: string;
  id: string;
  stock: number;
}

export const CartItem: React.FC<CartItemProps> = ({
  price,
  productImage,
  productName,
  productVariantName,
  productVariantId,
  quantity,
  selected = false,
  slug,
  id,
  stock,
}) => {
  const firstRenderRef = React.useRef<boolean>(true);

  const [currentQuantity, setCurrentQuantity] =
    React.useState<number>(quantity);
  const [quantityInputError, setQuantityInputError] =
    React.useState<string>("");
  const [debounceQuantity] = useDebounce(currentQuantity, 1000);

  const quaryClient = useQueryClient();
  const apiUtils = api.useContext();

  const { data: cartItem, mutate: updateCart } =
    api.cart.updateCart.useMutation({
      onError: (error) => {
        serializeAddToCartError(error.message);
        toast.error("Gagal menambahkan ke keranjang", {
          autoClose: 5000,
          position: "bottom-center",
          hideProgressBar: false,
          draggable: true,
          theme: "light",
        });
      },
    });

  const { mutate: deleteCart } = api.cart.deleteCart.useMutation({
    onError: (error) => {
      serializeAddToCartError(error.message),
        toast.error("Gagal menambahkan ke keranjang", {
          autoClose: 5000,
          position: "bottom-center",
          hideProgressBar: false,
          draggable: true,
          theme: "light",
        });
    },
    onSuccess: async () => {
      toast.success("Berhasil menambahkan ke keranjang", {
        autoClose: 5000,
        position: "bottom-center",
        hideProgressBar: false,
        draggable: true,
        theme: "light",
      });
      await quaryClient.invalidateQueries({
        queryKey: [apiUtils.cart.invalidate()],
      });
    },
  });

  const onUpdateCartQuantity = (type: "INCREMENT" | "DECREMENT") => {
    if (currentQuantity < stock && currentQuantity > 0) {
      setCurrentQuantity(currentQuantity);
      type === "INCREMENT" ? currentQuantity + 1 : currentQuantity - 1;
    }
  };

  // panggil mutasi(mutation) ketika `debounceQuantity` berubah
  React.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else if (debounceQuantity) {
      updateCart({
        cartId: id,
        productVariantId,
        quantity: debounceQuantity,
      });
      setQuantityInputError("");
    }
  }, [debounceQuantity, id, updateCart, productVariantId]);

  //atur status `currentQuantity` ke respons mutasi(Mutation)
  React.useEffect(() => {
    if (cartItem?.quantity) {
      setCurrentQuantity(cartItem?.quantity);
    }
  }, [cartItem?.quantity]);

  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <input
          type="checkbox"
          checked={selected}
          className="checkbox rounded-none"
        />
        <div className="aspect-h-2 aspect-w-3 w-full flex-shrink-0">
          <img
            src={productImage}
            alt={productVariantName}
            className="h-auto w-36 rounded-md object-fill md:rounded-md lg:w-28"
          />
          <div>
            <span>{productName}</span>
            <span>{productVariantName}</span>
            <span>{toRupiah(price)}</span>
          </div>
        </div>
      </div>

      <div className="grid items-center justify-end">
        
      </div>
    </div>
  );
};
