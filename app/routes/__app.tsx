import { Form, Link, NavLink, Outlet, useTransition } from "@remix-run/react";
import { FullFakebooksLogo, LogoutIcon, SpinnerIcon } from "~/components";
import clsx from "clsx";
import { useSpinDelay } from "spin-delay";

export default function AppRoute() {
  const transition = useTransition();
  const showSpinner = useSpinDelay(transition.state !== "idle");

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
            <NavItem to="dashboard">Dashboard</NavItem>
            {/* <NavItem to="accounts">Accounts</NavItem> */}
            {/* <NavItem to="sales">Sales</NavItem> */}
            <NavItem to="products">Products</NavItem>
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
