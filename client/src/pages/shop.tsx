import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function Shop() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  if (isLoading) {
    return (
      <div className="container px-4 py-8">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-full h-[200px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Space Shop</h1>
      <div className="grid grid-cols-2 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
