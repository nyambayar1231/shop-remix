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
        <Link to="new">
          <button className="btn-primary btn-sm">Шинэ бараа нэмэх</button>
        </Link>
      </div>
      <div className="h-6" />
      <Outlet />
    </div>
  );
}
