// Danh sách sản phẩm mới
// Được sử dụng trong component NewProducts

import { products } from './products';

// Lấy các sản phẩm mới từ products.js dựa trên isNew
export const newProducts = products.filter(p => p.isNew);