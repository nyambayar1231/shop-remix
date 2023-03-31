import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { LabelText } from "~/components";
import { getProductDetails } from "~/models/product.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderArgs) {
  const { productId } = params;

  if (typeof productId !== "string") {
    throw new Error("This should be impossible");
  }
  const productDetails = await getProductDetails(productId);
  return json({
    productDetails,
  });
}

export default function ProductRoute() {
  const data = useLoaderData<typeof loader>();

  console.log(data);

  const {
    productDetails: { product },
  } = data;

  return (
    <div className="mx-auto max-w-[600px] rounded-xl bg-aqua-50 px-6 py-4">
      <div className="h-6" />
      <div className="flex flex-col">
        <span className="text-primary">Нэр</span>
        <span className="">{product.name}</span>
      </div>
      <div className="h-6" />
      <div className="flex flex-col">
        <span className="text-primary">Код</span>
        <span>{product.code}</span>
      </div>
      <div className="h-6" />
      <div className="flex flex-col">
        <span className="text-primary">Үнэ</span>
        <span>{product.price}</span>
      </div>
      <div className=" h-6" />
      <div className="flex flex-col ">
        <span className="text-primary">Тайлбар</span>
        <span>{product.description}</span>
      </div>
      <div className="h-6" />
      <div className="flex flex-col">
        <span className="text-primary">Зураг</span>
        <div className="h-4" />
        <img src={product.image} alt="product" />
      </div>
    </div>
  );
}
