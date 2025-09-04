'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { products } from '@/lib/product-data';
import { ProductCard } from '@/app/(main)/merchandise/components/ProductCard';
import { ProductDetailDialog } from '@/app/(main)/merchandise/components/ProductDetailDialog';
import { OrderFormDialog } from '@/app/(main)/merchandise/components/OrderFormDialog';
import { ProductIntroSection } from '@/app/(main)/merchandise/components/ProductIntroSection';
import { useSearch } from '@/hooks/use-search';
import { usePagination } from '@/hooks/use-pagination';
import { Pagination } from '@/components/ui/pagination';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MerchandisePage() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { items, addToCart, clearCart } = useCart();
  const visibleProducts = useMemo(() => products.filter((p) => p.visible), []);
  const {
    searchQuery,
    setSearchQuery,
    filteredArray,
    clearSearch,
    hasResults,
    resultCount,
  } = useSearch(visibleProducts, ['name', 'description']);

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedProducts,
    goToPage,
    totalItems,
    itemsPerPage,
    resetPagination,
  } = usePagination({
    data: filteredArray,
  });

  const openProductDetail = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleOrderSuccess = () => {
    clearCart();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    resetPagination(); // Reset to page 1 when searching
  };

  const handleClearSearch = () => {
    clearSearch();
    resetPagination();
  };

  return (
    <div className="min-h-screen">
      {/* Header with Cart */}
      <ProductIntroSection />

      {/* Main Content */}
      <div className="relative z-20 bg-background px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sản phẩm IQI
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Khám phá bộ sưu tập merchandise IQI Vietnam
          </p>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {resultCount > 0 ? (
                  <span>
                    Tìm thấy
                    <span className="font-semibold text-orange-600">
                      {resultCount}
                    </span>
                    {`sản phẩm cho "${searchQuery}"`}
                  </span>
                ) : (
                  <span>
                    Không tìm thấy sản phẩm nào cho &quot;
                    <span className="font-semibold">{searchQuery}</span>&quot;
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {searchQuery ? (
                <>
                  Hiển thị {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredArray.length)}{' '}
                  trong {resultCount} kết quả tìm kiếm
                </>
              ) : (
                <>
                  Hiển thị {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredArray.length)}{' '}
                  trong tổng số {filteredArray.length} sản phẩm
                </>
              )}
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-gray-500">
                Trang {currentPage} / {totalPages}
              </p>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {hasResults ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetail={openProductDetail}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              displayResult={false}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              className="mt-8"
            />
          </>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-500 mb-4">
              {`Không có sản phẩm nào phù hợp với từ khóa "${searchQuery}"`}
            </p>
            <button
              onClick={handleClearSearch}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Xóa bộ lọc và xem tất cả sản phẩm
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <ProductDetailDialog
        product={selectedProduct}
        open={showProductDetail}
        onOpenChange={setShowProductDetail}
        onAddToCart={addToCart}
      />

      {/* Order Form Dialog */}
      <OrderFormDialog
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        cart={items}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
