import { inputClasses, LabelText } from "~/components";
import type { ActionArgs, UploadHandler } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useFetcher, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createProduct } from "~/models/product.server";

import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";

import { uploadImage } from "~/utils/utils.server";

function validatePrice(price: number) {
  if (price <= 0) return "Must be greater than 0";
  if (Number(price.toFixed(2)) !== price) {
    return "Must only have two decimal places";
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "img") {
        return undefined;
      }

      const uploadedImage: any = await uploadImage(data);

      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);

  const name = formData.get("name");
  const description = formData.get("description");
  const code = formData.get("code");
  const price = Number(formData.get("price"));
  const image = formData.get("img");

  invariant(typeof name === "string", "name is required");
  invariant(typeof code === "string", "code is required");
  invariant(typeof price === "number", "price is required");
  invariant(typeof image === "string", "imgSrc is required");

  const errors = {
    price: validatePrice(Number(price)),
  };

  const priceHasError = errors.price !== null;

  const hasErrors = priceHasError;
  if (hasErrors) {
    return json({ errors });
  }

  const product = await createProduct({
    name,
    description,
    code,
    price: Number(price),
    image,
  });

  if (!image) {
    return json({ error: "something wrong" });
  }

  return redirect(`/products/${product.id}`);
}

export default function NewProduct() {
  const data = useActionData<typeof action>();

  return (
    <Form
      encType="multipart/form-data"
      method="post"
      className="mx-auto max-w-[600px] rounded-xl bg-aqua-50 px-6 py-4"
    >
      <p className="text-gray-800">Ерөнхий мэдээлэл</p>
      <div className="h-6" />

      <div className="flex flex-col">
        <label htmlFor="name">
          <LabelText>Нэр</LabelText>
        </label>
        <input id="name" name="name" className={inputClasses} />
      </div>
      <div className="h-6" />
      <div>
        <label htmlFor="description">
          <LabelText>Тайлбар</LabelText>
        </label>
        <input name="description" className={inputClasses} />
      </div>
      <div className="h-6" />

      <div className="flex flex-col">
        <label htmlFor="img-field">
          <LabelText>Зураг</LabelText>
        </label>
        <input
          id="img-field"
          type="file"
          name="img"
          accept="image/*"
          className="file-input-bordered file-input-primary file-input-sm w-full max-w-xs"
        />
      </div>
      <div className="h-6" />

      <div className="flex flex-col">
        <label htmlFor="code">
          <LabelText>Барааны код</LabelText>
        </label>
        <input name="code" className={inputClasses} />
      </div>
      <div className="h-6" />

      <div className="flex flex-col">
        <label htmlFor="price">
          <LabelText>Үнэ</LabelText>
        </label>
        <input name="price" type="number" className={inputClasses} />
      </div>
      <div className="h-6" />

      {data?.product?.image ? (
        <>
          <h2>uploaded image</h2>
          <img src={data.product?.image} alt={"Upload result"} />
        </>
      ) : null}

      <div className="inline-flex w-full justify-end">
        <button
          type="submit"
          className="rounded-sm border bg-black px-4 py-2 text-white hover:bg-white hover:text-black"
        >
          Хадгалах
        </button>
      </div>
    </Form>
  );
}
