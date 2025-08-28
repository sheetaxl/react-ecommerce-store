import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Image */}
      <Skeleton className="h-40 w-full rounded-md mb-4" />

      {/* Title */}
      <Skeleton className="h-5 w-3/4 mb-2" />

      {/* Price */}
      <Skeleton className="h-4 w-1/4 mb-2" />

      {/* Description */}
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  );
};

export default ProductCardSkeleton;
