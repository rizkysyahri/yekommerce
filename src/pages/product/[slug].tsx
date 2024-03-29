import { IoRemoveOutline, IoAddOutline } from "react-icons/io5";
import type { GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import { FullPage } from "~/components/Layout";
import { prisma } from "~/server/db";

interface ProductDetailProps {
  productName: string;
  price: number;
  image: string[];
  rating?: number;
  slug: string;
  description: string;
  categories: string[];
  id: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  categories,
  description,
  image,
  price,
  productName,
}) => {
  const renderCategories = () => {
    return categories.map((category) => {
      return <div key={category} className="badge rounded text-green-800 font-bold bg-green-200 py-3">{category}</div>;
    });
  };

  return (
    <div className="container mx-auto mt-6 max-w-xl p-3">
      <FullPage>
        <div>
          <div className="">
            <img
              src={image[0] !== undefined ? image[0] : ''}
              alt={productName}
              className="h-96 w-full rounded-md"
            />
          </div>
        </div>

        <div className="mt-2 grid p-3">
          <span className="text-xl">{productName}</span>
          <span className="text-xl font-semibold">
            Rp {price.toLocaleString("id-ID")}
          </span>

          <div className="my-2 flex-wrap gap-3">{renderCategories()}</div>

          {/* <div className="mt-3 flex w-full gap-3">
            <div className="relative">
              <input
                type="radio"
                id="variant1"
                name="Variant"
                className="form-radio peer hidden"
              />
              <label
                htmlFor="variant1"
                className="flex cursor-pointer items-center gap-4 rounded-xl bg-white bg-opacity-90 px-4 py-2 shadow-xl backdrop-blur-2xl transition hover:bg-opacity-75 peer-checked:bg-emerald-400 peer-checked:text-white"
              >
                <span className="form-radio-mark"></span>
                500 gram
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                id="variant2"
                name="Variant"
                className="form-radio peer hidden"
              />
              <label
                htmlFor="variant2"
                className="flex cursor-pointer items-center gap-4 rounded-xl bg-white bg-opacity-90 px-4 py-2 shadow-xl backdrop-blur-2xl transition hover:bg-opacity-75 peer-checked:bg-emerald-400 peer-checked:text-white"
              >
                <span className="form-radio-mark"></span>
                300 gram
              </label>
            </div>
          </div> */}

          <div className="mt-3">
            <p>{description}</p>
          </div>

          <div className="mt-5 grid grid-cols-2">
            <div className="flex items-center justify-start">
              <button className="btn rounded-md px-4">
                <IoRemoveOutline className="w-8 h-8"  />
              </button>
            </div>
            <div className="flex items-center justify-end">
              <button className="btn rounded-md px-4 ">
                <IoAddOutline className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-center">
            <button className="btn w-full rounded-md">Tambahkan ke keranjang</button>
          </div>
        </div>
      </FullPage>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProductDetailProps>> => {
  const slug = context.params?.slug as string;

  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      CategoriesOnProducts: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!product) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const { id, image, price, description, name, rating, CategoriesOnProducts } =
    product;

  const categories = CategoriesOnProducts.map((val) => {
    return val.category.name;
  });

  return {
    props: {
      id,
      description,
      image,
      price,
      productName: name,
      rating,
      slug,
      categories,
    },
  };
};

export default ProductDetail;
