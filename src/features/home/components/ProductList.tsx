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
      limit: 2,
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
    <>
      <div className="flex items-center justify-center p-2 max-w-lg mx-auto">
        <label className="relative flex items-center text-gray-300 focus-within:text-gray-600 ">
          <Search className="absolute ml-3 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari Produk ..."
            onChange={onSeacrhChange}
            className="flex-grow rounded-md border-none px-10 py-2 pr-3 font-semibold text-black placeholder-gray-500 ring-2 ring-gray-300 focus:ring-2"
            style={{ width: "32rem" }}
          />
        </label>
      </div>

      <div className="py-5">
        <div className="flex items-center justify-center">
          {(isLoading || isRefetching) && !products ? (
            <span className="loading loading-ring loading-lg "></span>
          ) : (
            <div className="grid grid-cols-2 gap-4">{renderProducts()}</div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3">
        <div className="flex items-center justify-start">
          {products?.meta.page !== 1 && (
            <ArrowLeftCircle
              className="h-8 w-8"
              aria-label="Provious Page"
              onClick={() => setPage((prevPage) => prevPage - 1)}
            />
          )}
        </div>

        <div className="flex items-center justify-center">
          <span>{products?.meta.page}</span>
        </div>

        <div className="flex items-center justify-end">
          {products?.meta.hasNext && (
            <ArrowRightCircle
              className="h-8 w-8"
              aria-label="Provious Page"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            />
          )}
        </div>
      </div>
    </>
  );
};
