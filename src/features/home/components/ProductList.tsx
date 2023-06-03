import * as React from "react";
import { ArrowLeftCircle, ArrowRightCircle, Search } from "iconoir-react";
import { api } from "~/utils/api";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const [page, setPage] = React.useState<number>(1);
  const [searchProducts, setSearchProducts] = React.useState<string>("");
  const [debouncedSearchProduct] = useDebounce(searchProducts, 1000);

  const {
    data: products,
    isLoading,
    isRefetching,
  } = api.product.getProducts.useQuery(
    {
      limit: 1,
      page,
      name: debouncedSearchProduct,
    },

    {
      refetchOnWindowFocus: true,
    }
  );

  const router = useRouter();

  const renderProducts = () => {
    return products?.results.map(
      ({ id, image, name, price, rating, slug, ProductVariant }) => {
        return (
          <ProductCard
            slug={slug}
            image={image[0] || ""}
            productName={name}
            price={price}
            rating={rating}
            productVariants={ProductVariant}
            key={id}
          />
        );
      }
    );
  };

  const onSeacrhChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProducts(e?.currentTarget.value);
  };

  React.useEffect(() => {
    if (router.isReady) {
      void router.push({
        query: {
          page,
        },
      });
    }
  }, [page]);

  // tunggu hingga router siap, lalu setel status `halaman` ke halaman

  React.useEffect(() => {
    if (router.isReady) {
      setPage(
        parseInt(router.query.page ? (router.query.page as string) : "1")
      );
    }
  }, [router.isReady, router.query.page]);

  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-center">
        <label className="relative flex items-center text-gray-300 focus-within:text-gray-600">
          <Search className="absolute ml-3 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari Produk ..."
            onChange={onSeacrhChange}
            className="flex-grow rounded-2xl border-none px-3 py-2 pr-3 font-semibold text-black placeholder-gray-500 ring-2 ring-gray-300 focus:ring-2 sm:w-full md:w-96"
            style={{ width: "515px" }} // Menentukan lebar input menjadi 300 piksel
          />
        </label>
      </div>

      <div className="py-5 ">
        <div className="flex items-center justify-center">
        {(isLoading || isRefetching) && !products ? (
          <span className="loading loading-ring loading-lg bg-black"></span>
        ) : (
          <>{renderProducts()}</>
        )}
        </div>
      </div>

      <div className="grid grid-cols-3 mt-8">
        <div className="flex items-center justify-start">
            {products?.meta.page !== 1 && (
              <ArrowLeftCircle 
              className="w-8 h-8"
              aria-label="Provious Page"
              onClick={() => setPage((prevPage) => prevPage - 1)}
              />
            )}
        </div>

        <div className="flex items-center justify-center">
              <span >{products?.meta.page}</span>
        </div>

        <div className="flex items-center justify-end">
              {products?.meta.hasNext && (
                <ArrowRightCircle
                className="w-8 h-8"
                aria-label="Provious Page"
                onClick={() => setPage((prevPage) => prevPage + 1)}
                />
              )}
        </div>

      </div>
    </div>
  );
};
