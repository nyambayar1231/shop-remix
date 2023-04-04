import { Outlet } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getProducts } from "~/models/product.server";

// const linkClassName = ({ isActive }: { isActive: boolean }) =>
//   isActive ? "font-bold text-black" : "";

export async function loader({ request }: LoaderArgs) {
  const products = await getProducts();
  return json({
    products,
  });
}

export default function Products() {
  // const matches = useMatches();

  // const indexMatches = matches.some(
  //   (m) => m.id === "routes/__app/products/index"
  // );
  // const newProductMatches = matches.some(
  //   (m) => m.id === "routes/__app/products/new"
  // );

  return <Outlet />;
}
