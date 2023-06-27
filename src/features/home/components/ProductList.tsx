import * as React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
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
            key={id}
            slug={slug}
            image={image[0] || ""}
            productName={name}
            price={price}
            rating={rating}
            productVariants={ProductVariant}
          />
        );
      }
    );
  };

  const onSeacrhChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps 
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
      <div className="flex items-center justify-center">
        <input
          type="search"
          onChange={onSeacrhChange}
          placeholder="Cari Produk ..."
          className="w-full max-w-xl mb-4 rounded-md p-2 indent-2 ring-1 ring-slate-200 transition duration-300 ease-in-out focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-sky-200"
        />
      </div>

      <div className="flex items-center justify-center">
        {(isLoading || isRefetching) && !products ? (
          <span className="loading loading-ring loading-lg "></span>
        ) : (
          <div className="grid grid-cols-2 gap-4 max-w-xl w-full">
            {renderProducts()}
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-3">
        <div className="flex items-center justify-start">
          {products?.meta.page !== 1 && (
            <IoChevronBackOutline
              className="h-11 w-11 bg-zinc-200 px-3 py-2 rounded-md"
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
            <IoChevronForwardOutline
              className="h-11 w-11 bg-zinc-200 px-3 py-2 rounded-md"
              aria-label="Provious Page"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            />
          )}
        </div>
      </div>
    </>
  );
};
