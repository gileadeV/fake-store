import { fetchFromAPI } from "@/lib/fetch-from-api";
import { Products } from "@/types/types";
import ProductsPageClient from "./components/products-page";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const products = await fetchFromAPI<Products[]>({
    path: "/api/products",
    queryParams: { category },
    nextOptions: { revalidate: 60 },
  });

  return <ProductsPageClient products={products} />;
}
