import { CartItem } from "~/features/cart";
import { api } from "~/utils/api";
// import { useClientProtected } from "~/hooks/useClientProtected";

const Cart = () => {

  // useClientProtected()

  const { data: cart } = api.cart.getCart.useQuery();

  const renderCart = () => {
    if (!cart?.length) {
      return (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div className="grid">
            <span className="font-semibold">Keranjang Kamu Kosong!</span>
            <span>Silahkan tambahkan barang ke keranjang mu</span>
          </div>
        </div>
      );
    }

    return cart?.map((cartItem) => {
      return (
        <CartItem
          id={cartItem.id}
          price={cartItem.item.price}
          productImage={cartItem.item.image}
          productName={cartItem.item.product.name}
          productVariantName={cartItem.item.label}
          productVariantId={cartItem.item.id}
          quantity={cartItem.quantity}
          slug={cartItem.item.product.slug}
          stock={cartItem.item.Inventory[0]?.quantity as number}
          key={cartItem.id}
        />
      );
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-3 py-6">
      <div className="grid">
        <div className="mb-10">
          <span className="text-xl font-semibold">Keranjang Belanja</span>
        </div>
        <div className="grid">{renderCart()}</div>
      </div>
    </div>
  );
};

export default Cart;
