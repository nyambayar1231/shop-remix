import { Link } from "@remix-run/react";

import { inputClasses } from "~/components";

export default function Category() {
  return (
    <div className="bg-white">
      <div className="flex w-full items-center justify-between px-10 pt-4">
        <h1 className="font-display text-d-h3 text-black">Ангилалууд</h1>
        <Link to="new">
          <button className="btn-active btn-md btn hover:bg-white hover:text-black">
            Ангилал Нэмэх
          </button>
        </Link>
      </div>
      <div className="h-2" />
      <div className="h-[0.5px] bg-gray-200 " />
      <div className="border-b px-10 pt-4 ">
        <div className="flex">
          <span className="border-b-[2px] border-black px-4 pb-2">
            Бүх ангилалууд
          </span>
        </div>
      </div>
      <div className="h-[0.5px] bg-gray-100" />
      <div className="h-4" />
      <div className="px-10">
        <input className={inputClasses} placeholder="Ангилал хайх" />
      </div>
      <div className="h-4" />
      <div className="h-[0.5px] bg-gray-100" />
      <div className="h-4" />
      <div className="w-full overflow-x-auto px-10">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Ангилалийн нэр</th>
              <th>Дэд ангилал</th>
              <th>Барааны тоо</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    {/* <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div> */}
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge-ghost badge badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>Purple</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
