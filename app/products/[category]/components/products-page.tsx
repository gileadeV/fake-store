"use client";

import { currencyFormatter } from "@/lib/calculation";
import { ProductsProps } from "@/types/types";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/navigation";
import { theme } from "@/lib/theme-colors";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ProductsPageClient({ products }: ProductsProps) {
  const { theme: current } = useTheme();
  const isDark = current === "dark";

  const colors = isDark ? theme.dark : theme.light;
  const router = useRouter();

  const handleSelectProduct = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      className="flex flex-wrap gap-6 justify-center py-6 px-8 h-full"
      style={{ background: colors.background, color: colors.text }}
    >
      {products?.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSelectProduct(item.id)}
          style={{ background: colors.background, color: colors.text }}
          className="w-[250px] pt-5 bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-[#00ffaa]/40 transition-all cursor-pointer hover:scale-[1.02]"
        >
          <Image
            src={item.thumbnail}
            alt={item.title}
            height={300}
            width={300}
            className="h-48 w-full object-cover border-b border-[#00ffaa]/20"
          />

          <div className="p-4 text-[#d1fce6]">
            <h5
              className="text-lg font-semibold truncate"
              style={{ background: colors.background, color: colors.text }}
            >
              {item.title}
            </h5>
            <p
              className="text-[#00ffaa] font-bold mt-1"
              style={{ background: colors.background, color: colors.text }}
            >
              {currencyFormatter(item.price, "USD")}
            </p>

            <div
              className="mt-2 text-sm text-[#d1fce6]/80"
              style={{ background: colors.background, color: colors.text }}
            >
              <p className="truncate">{item.brand}</p>
              <p className="truncate">{item.shippingInformation}</p>
            </div>

            <div className="mt-3">
              <Rating
                name={`rating-${item.id}`}
                value={item.rating}
                readOnly
                precision={0.5}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
