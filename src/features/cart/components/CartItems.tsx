import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useDebounce } from "use-debounce";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { serializeAddToCartError } from "../utils/serializeAddToCartError";
import { toRupiah } from "~/utils/format";
import Link from "next/link";
import {
  IoAddCircleOutline,
  IoRemoveCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";

interface CartItemProps {
  productName: string;
  productImage: string;
  price: number;
  productVariantName: string;
  productVariantId: string;
  quantity: number;
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
  slug,
  id,
  stock,
}) => {
  const firstRenderRef = React.useRef<boolean>(true);

  const [isChecked, setIsChecked] = React.useState(false);
  const [currentQuantity, setCurrentQuantity] =
    React.useState<number>(quantity);
  const [quantityInputError, setQuantityInputError] =
    React.useState<string>("");
  const [debounceQuantity] = useDebounce(currentQuantity, 1000);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
    <div className="mb-10 flex items-center gap-5">
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        className="checkbox h-5 w-5 self-center rounded-md"
      />
      <div className="flex items-center gap-5">
        <img
          src={productImage}
          alt={productVariantName}
          className="h-auto w-36 rounded-md object-fill"
        />
        <div className="flex flex-col">
          <div className="grid">
            <span className="font-semibold">{productName}</span>
            <span className="mb-5 text-zinc-500">{productVariantName}</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-semibold">{toRupiah(price)}</span>
            <Link
              href={`/product/${slug}`}
              className=" ml-16 text-sm text-zinc-500 underline"
            >
              detail produk
            </Link>
            <span className="mx-3 font-semibold">|</span>
            <IoTrashOutline
              className="cursor-pointer text-zinc-500"
              onClick={() => deleteCart({ cartId: id })}
            />

            <div className="ml-5 flex items-center justify-around">
              <button
                onClick={() => onUpdateCartQuantity("INCREMENT")}
                aria-label="subtract quantity"
              >
                <IoRemoveCircleOutline />
              </button>
              <input
                className="w-10 rounded-none border-0 text-center"
                min={1}
                type="number"
                value={currentQuantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);

                  if (value <= stock) {
                    setCurrentQuantity(value);
                    return;
                  }

                  if (value <= 0 || isNaN(value)) {
                    setCurrentQuantity(0);
                    setQuantityInputError("Jumlah harus diisi");
                  }
                }}
              />
              <button
                aria-label="add quantity"
                onClick={() => onUpdateCartQuantity("DECREMENT")}
              >
                <IoAddCircleOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
