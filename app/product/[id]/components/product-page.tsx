"use client";

import { currencyFormatter } from "@/lib/calculation";
import { theme } from "@/lib/theme-colors";
import { Products } from "@/types/types";
import Rating from "@mui/material/Rating";
import { useTheme } from "next-themes";
import { ButtonBuy } from "./button-buy";
import { CepInput } from "./cep-input";
import { ProductImages } from "./product-images";
import { Reviews } from "./reviews";

interface ProductPageClientProps {
  product: Products;
}

export const ProductPageClient: React.FC<ProductPageClientProps> = ({
  product,
}) => {
  const { theme: current } = useTheme();
  const isDark = current === "dark";
  const colors = isDark ? theme.dark : theme.light;

  return (
    <div
      className="p-6 max-w-5xl mx-auto"
      style={{ background: colors.background, color: colors.text }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ProductImages product={product} />

        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-lg text-gray-400">{product.description}</p>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#00ffaa]">
              {currencyFormatter(product.price, "USD")}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {currencyFormatter(
                product.price / (1 - product.discountPercentage / 100),
                "USD"
              )}
            </span>
          </div>

          <div>
            <Rating value={product.rating} readOnly precision={0.5} />
            <p className="text-sm text-gray-400">
              {product.reviews.length} avaliações
            </p>
          </div>

          <div className="flex gap-2">
            <span className="text-sm px-3 py-1 bg-gray-200 text-black rounded">
              Marca: {product.brand}
            </span>
            <span className="text-sm px-3 py-1 bg-gray-200 text-black rounded">
              SKU: {product.sku}
            </span>
            <span className="text-sm px-3 py-1 bg-gray-200 text-black rounded">
              Estoque: {product.stock}
            </span>
          </div>

          <p className="text-sm">Garantia: {product.warrantyInformation}</p>
          <p className="text-sm">
            Política de devolução: {product.returnPolicy}
          </p>

          <div className="text-sm space-y-1">
            <p>
              Dimensões: {product.dimensions.width} x{" "}
              {product.dimensions.height} x {product.dimensions.depth} cm
            </p>
            <p>Peso: {product.weight} kg</p>
            <p>Disponibilidade: {product.availabilityStatus}</p>
            <p>Enviado por: {product.shippingInformation}</p>
          </div>

          <CepInput />

          <ButtonBuy />
        </div>
      </div>

      <Reviews product={product} />
    </div>
  );
};
