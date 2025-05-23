"use client";

import { Products } from "@/types/types";
import { useState } from "react";
import Image from "next/image";

interface ProductPageClientProps {
  product: Products;
}

export const ProductImages: React.FC<ProductPageClientProps> = ({
  product,
}) => {
  const [mainImage, setMainImage] = useState(product.thumbnail);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={mainImage}
          alt={product.title}
          height={300}
          width={300}
          className="w-[300px] h-[300px] rounded-xl border border-[#00ffaa]/30"
        />

        <div className="flex gap-3 flex-wrap justify-center">
          {[product.thumbnail, ...product.images].map((img, idx) => (
            <Image
              key={idx}
              src={img}
              height={300}
              width={300}
              alt={`Thumbnail ${idx}`}
              onClick={() => setMainImage(img)}
              className={`w-16 h-16 rounded-md object-cover border-2 cursor-pointer ${
                mainImage === img
                  ? "border-[#00ffaa]"
                  : "border-gray-300 hover:border-[#00ffaa]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};
