// Danh sách tất cả sản phẩm trong hệ thống
// Được sử dụng trong trang danh sách sản phẩm

export const products = [
  {
    id: 1,
    name: 'Xi măng Portland PC40',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    price: 95000,
    salePrice: 85000,
    rating: 4.8,
    reviewCount: 124,
    slug: 'xi-mang-portland-pc40',
    category: 'vat-lieu-xay-dung',
    brand: 'Hà Tiên',
  },
  {
    id: 2,
    name: 'Gạch ốp tường Đồng Tâm 30x60',
    image: 'https://images.unsplash.com/photo-1584733303662-e5dcc1801cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: 180000,
    salePrice: null,
    rating: 4.5,
    reviewCount: 98,
    slug: 'gach-op-tuong-dong-tam-30x60',
    category: 'vat-lieu-xay-dung',
    brand: 'Đồng Tâm',
  },
  {
    id: 3,
    name: 'Sơn nội thất Dulux',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnQlMjBjYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: 650000,
    salePrice: 590000,
    rating: 4.7,
    reviewCount: 156,
    slug: 'son-noi-that-dulux',
    category: 'son-phu-kien',
    brand: 'Dulux',
  },
  {
    id: 4,
    name: 'Thép xây dựng Pomina Φ10',
    image: 'https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RlZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: 320000,
    salePrice: null,
    rating: 4.9,
    reviewCount: 210,
    slug: 'thep-xay-dung-pomina-phi10',
    category: 'vat-lieu-xay-dung',
    brand: 'Pomina',
  },
  {
    id: 5,
    name: 'Ống nhựa uPVC Bình Minh Φ90',
    image: 'https://images.unsplash.com/photo-1599611863977-91adabb6fd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGlwZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 245000,
    salePrice: 220000,
    rating: 4.6,
    reviewCount: 87,
    slug: 'ong-nhua-upvc-binh-minh-phi90',
    category: 'vat-tu-cap-thoat-nuoc',
    brand: 'Bình Minh',
  },
  {
    id: 6,
    name: 'Dây điện Cadisun 2x2.5mm',
    image: 'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGVsZWN0cmljJTIwd2lyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 18000,
    salePrice: null,
    rating: 4.4,
    reviewCount: 65,
    slug: 'day-dien-cadisun-2x2-5mm',
    category: 'thiet-bi-dien',
    brand: 'Cadisun',
  },
  {
    id: 7,
    name: 'Keo dán gạch Weber',
    image: '/assets/images/product-adhesive.jpg',
    price: 120000,
    salePrice: 110000,
    rating: 4.7,
    reviewCount: 92,
    slug: 'keo-dan-gach-weber',
    category: 'vat-lieu-xay-dung',
    brand: 'Weber',
  },
  {
    id: 8,
    name: 'Khóa cửa chính Yale',
    image: '/assets/images/product-lock.jpg',
    price: 1200000,
    salePrice: 1050000,
    rating: 4.8,
    reviewCount: 113,
    slug: 'khoa-cua-chinh-yale',
    category: 'vat-lieu-noi-that',
    brand: 'Yale',
  },
];

// Lấy danh sách sản phẩm theo danh mục
export const getProductsByCategory = (categorySlug) => {
  if (!categorySlug) return products;
  return products.filter(product => product.category === categorySlug);
};

// Lấy sản phẩm theo slug
export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};

// Lấy danh sách sản phẩm liên quan (cùng danh mục, không bao gồm sản phẩm hiện tại)
export const getRelatedProducts = (currentProductId, categorySlug, limit = 4) => {
  return products
    .filter(product => product.category === categorySlug && product.id !== currentProductId)
    .slice(0, limit);
};