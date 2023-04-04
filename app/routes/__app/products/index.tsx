import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getProducts } from "~/models/product.server";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const products = await getProducts();
  return json({
    products,
  });
}

export default function Product() {
  return (
    <div className="bg-gray-50 p-10">
      <div className="flex w-full justify-between">
        <h1 className="font-display text-d-h3 text-black">
          Бараа бүтээгдэхүүнүүд
        </h1>
        <Link to="new">
          <button className="btn-active btn-md btn hover:bg-white hover:text-black">
            Бараа Нэмэх
          </button>
        </Link>
        {/* <label htmlFor="my-modal-4" className="btn-primary btn">
          Шинэ бараа нэмэх
        </label> */}
      </div>

      {/* <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Ангилал сонгох</h3>
          <div className="h-10" />

          <div className="divider w-full" />
          <div className="flex items-end">
            <button>Буцах</button>
            <button>Сонгох</button>
          </div>
        </label>
      </label> */}
      <div className="h-6" />
      <div className="mx-auto w-full">
        <input
          type="text"
          placeholder="Хайх"
          className="input w-full max-w-xs focus:outline-primary"
        />
      </div>
      <div className="h-10" />
      <ProductList />
    </div>
  );
}

function ProductList() {
  const data = useLoaderData<typeof loader>();
  const products = data.products;
  return (
    <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products?.map((product) => {
        return (
          <Link
            to={`${product?.id}`}
            key={product?.id}
            className="flex h-full flex-col bg-white shadow-sm"
          >
            <div className="flex flex-grow items-center justify-center">
              <img
                className="cloud-responsive min-h-full max-w-full object-contain"
                src={product?.image}
                alt="Shoes"
              />
            </div>
            <div className="px-4">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-d-p-sm">{product.code}</p>
              <p>{product.price.toFixed(2)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
