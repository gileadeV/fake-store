"use client";

import { Products } from "@/types/types";
import Rating from "@mui/material/Rating";

interface ProductPageClientProps {
  product: Products;
}

export const Reviews: React.FC<ProductPageClientProps> = ({ product }) => {

  return (
    <>
      {product.reviews.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Avaliações</h3>
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{review.reviewerName}</h4>
                  <Rating value={review.rating} readOnly precision={0.5} />
                </div>
                <p className="text-sm text-gray-400">{review.date}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
