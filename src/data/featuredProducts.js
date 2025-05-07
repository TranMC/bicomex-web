// Danh sách sản phẩm nổi bật được hiển thị trên trang chủ
// Được sử dụng trong component FeaturedProducts

import { products } from './products';

// Lọc 8 sản phẩm có rating cao nhất để hiển thị trong mục sản phẩm nổi bật
export const featuredProducts = products
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 8);