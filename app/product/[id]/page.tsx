import { fetchFromAPI } from "@/lib/fetch-from-api";
import { ProductPageClient } from "./components/product-page";
import { Products } from "@/types/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data: Products = await fetchFromAPI({
    path: "/api/product",
    queryParams: { id },
    nextOptions: { revalidate: 60 },
  });

  return <ProductPageClient product={data} />;
}
