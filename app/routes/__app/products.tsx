import { Link, NavLink, Outlet, useMatches } from "@remix-run/react";

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? "font-bold text-black" : "";

export default function Products() {
  const matches = useMatches();

  const indexMatches = matches.some(
    (m) => m.id === "routes/__app/products/index"
  );
  const newProductMatches = matches.some(
    (m) => m.id === "routes/__app/products/new"
  );
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
      {/* <div className="flex gap-4 border-b border-gray-100 pb-4 text-[length:14px] font-medium text-gray-400">
        <NavLink to="." className={linkClassName({ isActive: indexMatches })}>
          Бүх бараа
        </NavLink>

        <NavLink
          to="new"
          className={linkClassName({ isActive: newProductMatches })}
        >
          Шинэ бараа
        </NavLink>
      </div> */}
      {/* <div className="h-4" /> */}

      <Outlet />
    </div>
  );
}
