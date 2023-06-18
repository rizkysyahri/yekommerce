import * as React from "react";
import { toRupiah } from "~/utils/format";

interface ProductVariantRadioCartProps {
  price: number;
  variantLabel: string;
}

export const ProductVariantRadioCart: React.FC<
  ProductVariantRadioCartProps
> = ({ price, variantLabel }) => {
  return (
    <div className="w-full p-2">
      <div className="relative">
        <input type="radio" name="Variant" className="form-radio peer hidden" />
        <label
          htmlFor="variant"
          className="flex cursor-pointer items-center gap-4 rounded-xl bg-white bg-opacity-90 px-5 py-3 shadow-xl backdrop-blur-2xl transition hover:bg-opacity-75 peer-checked:bg-emerald-400 peer-checked:text-white"
        >
          <div className="grid">
            <span className="form-radio-mark">{variantLabel}</span>
            <span className="form-radio-mark">{toRupiah(price)}</span>
          </div>
        </label>
      </div>
    </div>
  );
};
