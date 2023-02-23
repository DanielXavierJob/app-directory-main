import { Ping } from '#/ui/Ping';

import { Suspense } from 'react';
import { SingleProduct } from '../../../_components/SingleProduct';
import { RecommendedProducts, RecommendedProductsSkeleton } from '../../../_components/RecommendedProducts';
import { Reviews, ReviewsSkeleton } from '../../../_components/Reviews';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8 lg:space-y-14">
      {/* @ts-expect-error Async Server Component */}
      <SingleProduct
        data={fetch(`https://app-dir.vercel.app/api/products?id=${params.id}`)}
      />

      <div className="relative">
        <div className="absolute top-2 -left-4">
          <Ping />
        </div>
      </div>

      <Suspense fallback={<RecommendedProductsSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <RecommendedProducts
          path="/streaming/edge/product"
          data={fetch(
            // We intentionally delay the reponse to simulate a slow data
            // request that would benefit from streaming
            `https://app-dir.vercel.app/api/products?delay=500&filter=${params.id}`,
          )}
        />
      </Suspense>

      <div className="relative">
        <div className="absolute top-2 -left-4">
          <Ping />
        </div>
      </div>

      <Suspense fallback={<ReviewsSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <Reviews
          data={fetch(
            // We intentionally delay the reponse to simulate a slow data
            // request that would benefit from streaming
            `https://app-dir.vercel.app/api/reviews?delay=1000`,
          )}
        />
      </Suspense>
    </div>
  );
}
