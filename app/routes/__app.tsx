import { Form, Link, NavLink, Outlet, useTransition } from "@remix-run/react";
import { FullFakebooksLogo, LogoutIcon, SpinnerIcon } from "~/components";
import clsx from "clsx";
import { useSpinDelay } from "spin-delay";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader(request: any) {
  const apiKey =
    "207015e9678c94c0e75a7c9810f3c12d6d2a765563ec3c9e890a5eb68cf9663113e7924b1474b21331646d332c02efa3362e8aead474b99d361618c79fc00d1e3496837a6d2b78d29ee3755fd8cd431b767346adbd54e746ed0712089239c1b03a7e0c1fa6143cdc8c0f2758a6ef55dfe257d12ddfe3978cfde33e5ea20cef97";

  async function fetchProducts() {
    const response = await fetch(
      "http://localhost:1337/api/products?populate=*",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("----->", response);
    const data = await response.json();

    return data;
  }

  const products = await fetchProducts()
    .then((data) => data)
    .catch((error) => console.error(error));

  return json({ products });
}

export default function AppRoute() {
  const transition = useTransition();
  const showSpinner = useSpinDelay(transition.state !== "idle");

  const loaderData = useLoaderData();

  console.log(loaderData);

  return (
    <div className="relative flex h-full rounded-lg bg-white text-gray-600">
      <div className="border-r border-gray-100 bg-gray-50">
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1">
            <Link to=".">
              <FullFakebooksLogo size="sm" position="left" />
            </Link>
            <Spinner visible={showSpinner} />
          </div>
          <div className="h-7" />
          <div className="flex flex-col font-bold text-gray-800">
            <NavItem to="dashboard">Нүүр</NavItem>
            {/* <NavItem to="accounts">Accounts</NavItem> */}
            {/* <NavItem to="sales">Sales</NavItem> */}
            <NavItem to="products">Бараа</NavItem>
            <NavItem to="categories">Ангилал</NavItem>
            {/* <NavItem to="expenses">Expenses</NavItem> */}
            {/* <NavItem to="reports">Reports</NavItem> */}

            <Form
              method="post"
              action="/logout"
              className="text-[length:14px]] my-1 py-1 px-2 pr-16"
            >
              <button type="submit" className="flex gap-1 font-bold">
                Logout <LogoutIcon />
              </button>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      prefetch="intent"
      className={({ isActive }) =>
        `my-1 py-1 px-2 pr-16 text-[length:14px] ${
          isActive ? "rounded-md bg-gray-100" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function Spinner({ visible }: { visible: boolean }) {
  return (
    <SpinnerIcon
      className={clsx("animate-spin transition-opacity", {
        "opacity-0": !visible,
        "opacity-100": visible,
      })}
    />
  );
}
