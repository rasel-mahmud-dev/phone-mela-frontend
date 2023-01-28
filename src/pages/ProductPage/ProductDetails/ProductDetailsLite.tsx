import React, {lazy, Suspense} from 'react';
import ProductDetailsSkeleton from "pages/ProductPage/ProductDetails/ProductDetails.Skeleton";

const ProductDetails  = lazy(()=>import("./ProductDetails"))

const ProductDetailLite = () => {
    return (
        <div>

            <Suspense fallback={<div className="container">
                <ProductDetailsSkeleton />
            </div>
            }>
                <ProductDetails />
            </Suspense>
        </div>
    );
};

export default ProductDetailLite;