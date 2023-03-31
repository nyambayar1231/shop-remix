import { prisma } from "~/db.server";

export async function createProduct({
  name,
  description,
  image,
  price,
  code,
}: {
  name: string;
  description?: any;
  image: string;
  price: number;
  code: string;
}) {
  return prisma.product.create({
    data: {
      name,
      description,
      image,
      price,
      code,
    },
  });
}

export async function getProducts() {
  return prisma.product.findMany();
}

export async function getProductDetails(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) return null;
  return { product };
}
