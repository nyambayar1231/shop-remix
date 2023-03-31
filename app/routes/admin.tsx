import { HomeIcon, LogoIcon, CatalogIcon } from "~/assets/icons";
import cn from "classnames";
import { Link, useLocation } from "@remix-run/react";

export default function AdminRoute() {
  let { pathname } = useLocation();

  return (
    <div className="flex text-sm">
      {
        // to do transition
      }
      <div className="h-screen w-[240px]">
        <div className="fixed h-screen overflow-y-auto overflow-x-hidden pb-10">
          <Link className="mt-9 mb-10 ml-8 block text-inherit" to="/admin">
            <LogoIcon />
          </Link>
          <Link
            className={cn(
              "text-[rgba(37, 41, 41, 1)] block  p-4",
              pathname === "/admin" && "bg-white"
            )}
            to="/admin"
          >
            <span className="m-0 inline-flex cursor-pointer items-center border-none bg-none p-0 text-inherit">
              <HomeIcon />
              <div className="pointer-events-none block w-[200px] cursor-pointer text-left  opacity-100">
                Нүүр
              </div>
            </span>
          </Link>
          <Link
            className={cn(
              "text-[rgba(37, 41, 41, 1)] block py-4 pl-4",
              pathname === "/admin/product" && "bg-white"
            )}
            to="product"
          >
            <span className="m-0 inline-flex cursor-pointer items-center border-none bg-none p-0 text-inherit">
              <CatalogIcon />
              <div className="pointer-events-none block w-[200px] cursor-pointer text-left   opacity-100">
                Бараа бүтээгдэхүүн
              </div>
            </span>
          </Link>
          <Link
            className={cn(
              "text-[rgba(37, 41, 41, 1)] block py-4 pl-4",
              pathname === "/admin/user" && "bg-white"
            )}
            to="user"
          >
            <span className="m-0 inline-flex cursor-pointer items-center border-none bg-none p-0 text-inherit">
              <CatalogIcon />
              <div className="pointer-events-none block w-[200px] cursor-pointer text-left   opacity-100">
                Хэрэглэгчид
              </div>
            </span>
          </Link>
          <Link
            className={cn(
              "text-[rgba(37, 41, 41, 1)] block py-4 pl-4",
              pathname === "/admin/order" && "bg-white"
            )}
            to="order"
          >
            <span className="m-0 inline-flex cursor-pointer items-center border-none bg-none p-0 text-inherit">
              <CatalogIcon />
              <div className="pointer-events-none block w-[200px] cursor-pointer text-left   opacity-100">
                Захиалгууд
              </div>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
