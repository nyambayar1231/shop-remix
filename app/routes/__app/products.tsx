import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getProducts } from "~/models/product.server";

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? "font-bold text-black" : "";

export async function loader({ request }: LoaderArgs) {
  const products = await getProducts();
  return json({
    products,
  });
}

export default function Products() {
  const matches = useMatches();

  const indexMatches = matches.some(
    (m) => m.id === "routes/__app/products/index"
  );
  const newProductMatches = matches.some(
    (m) => m.id === "routes/__app/products/new"
  );

  const data = useLoaderData<typeof loader>();

  console.log(data);
  return (
    <div className="relative h-full p-10">
      <div className="flex w-full justify-between">
        <h1 className="font-display text-d-h3 text-black">
          Бараа бүтээгдэхүүнүүд
        </h1>
        <button className="btn-primary btn-sm">
          <Link to="new">Шинэ бараа нэмэх</Link>
        </button>
      </div>
      <div className="h-6" />

      <div className="grid grid-cols-4 gap-4">
        <div className="card h-[80px] bg-base-100 shadow-xl">
          <img
            className="h-full object-cover"
            src="https://res.cloudinary.com/dhvnuxwbp/image/upload/v1680258923/remix/t3ufj4czltatl22glfkb.png"
            alt="Shoes"
          />
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
          </div>
        </div>
        <div className="h-10 bg-red-400"></div>
        <div className="h-10 bg-red-400"></div>
        <div className="h-10 bg-red-400"></div>
      </div>

      <Outlet />
    </div>
  );
}
