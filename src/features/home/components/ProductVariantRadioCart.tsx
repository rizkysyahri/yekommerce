import * as React from "react";
import { toRupiah } from "~/utils/format";
import { IoCheckmarkOutline } from "react-icons/io5";

interface ProductVariantRadioCartProps {
  price: number;
  variantLabel: string;
  selected: boolean;
  onChange: () => void;
}

export const ProductVariantRadioCart: React.FC<ProductVariantRadioCartProps> = ({
  price,
  variantLabel,
  onChange,
}) => {
  const [selected, setIsSelected] = React.useState(false)
  const handleRadioChange = () => {
    setIsSelected(!selected)
    onChange();
  };

  const inputId = variantLabel.replace(/\s/g, "-").toLowerCase();

  return (
    <>
      <div className="relative">
        <input
          type="radio"
          name="Variant"
          id={inputId}
          className="peer hidden"
          checked={selected}
          onChange={handleRadioChange}
        />
        <label
          htmlFor={inputId}
          className={`peer-check:bg-emerald-400 flex cursor-pointer items-center gap-4 rounded-xl bg-white bg-opacity-90 p-4 shadow-xl backdrop-blur-2xl transition hover:bg-opacity-75 ${
            selected ? "peer-checked:bg-sky-400 peer-checked:text-black" : ""
          }`}
        >
          <div>
            <h6 className="text-base">{variantLabel}</h6>
            <span className="text-sm opacity-60">{toRupiah(price)}</span>
          </div>
        </label>
        {selected && (
          <div className="absolute bottom-0 right-4 top-0 my-auto flex h-6 w-6 rounded-full bg-green-500 transition delay-100 peer-checked:scale-100 scale-0">
            <IoCheckmarkOutline className="mx-auto my-auto w-5 text-white" />
          </div>
        )}
      </div>
    </>
  );
};
