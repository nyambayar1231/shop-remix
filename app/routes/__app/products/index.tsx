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
  const data = useLoaderData<typeof loader>();
  const products = data.products;

  console.log(data);
  return (
    <div className="grid grid-cols-2 gap-6 bg-slate-50 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products?.map((product) => {
        return (
          <Link
            to={`${product?.id}`}
            key={product?.id}
            className="flex h-full flex-col bg-white p-4 shadow-sm"
          >
            <div className="flex flex-grow items-center justify-center">
              <img
                className="cloud-responsive min-h-full max-w-full object-contain"
                src={product?.image}
                alt="Shoes"
              />
            </div>
            <div className="">
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
