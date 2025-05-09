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
    ratingCount: 124,
    slug: 'xi-mang-portland-pc40',
    category: 'vat-lieu-tho',
    categories: ['vat-lieu-tho', 'xi-mang'],
    brand: 'Hà Tiên',
    isInStock: true,
    shortDescription: 'Xi măng chất lượng cao, chống thấm tốt',
  },
  {
    id: 2,
    name: 'Gạch ốp tường Đồng Tâm 30x60',
    image: 'https://images.unsplash.com/photo-1584733303662-e5dcc1801cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: 180000,
    salePrice: null,
    rating: 4.5,
    ratingCount: 98,
    slug: 'gach-op-tuong-dong-tam-30x60',
    category: 'gach-op-lat',
    categories: ['gach-op-lat'],
    brand: 'Đồng Tâm',
    isInStock: true,
    shortDescription: 'Gạch men cao cấp, bề mặt sáng bóng',
  },
  {
    id: 3,
    name: 'Sơn nước OEXPO',
    image: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/products/148696797-733627444225128-7706280598761030498-n-b7f5af52-a3df-4d13-88df-6b34995edd67.png',
    price: 350000,
    salePrice: 310000,
    rating: 4.7,
    ratingCount: 156,
    slug: 'son-nuoc-oexpo',
    category: 'son',
    categories: ['son', 'son-noi-that'],
    brand: 'OEXPO',
    isInStock: true,
    shortDescription: 'Sơn nước chính hãng là một trong những hãng được nhiều người tin dùng',
    isNew: true,
  },
  {
    id: 4,
    name: 'Thép xây dựng Pomina Φ10',
    image: 'https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RlZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    price: 320000,
    salePrice: null,
    rating: 4.9,
    ratingCount: 210,
    slug: 'thep-xay-dung-pomina-phi10',
    category: 'vat-lieu-tho',
    categories: ['vat-lieu-tho', 'thep-xay-dung'],
    brand: 'Pomina',
    isInStock: true,
    shortDescription: 'Thép xây dựng chất lượng cao',
  },
  {
    id: 5,
    name: 'Sơn nước Dulux Hight Gloss',
    image: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/products/dulux-trade-pure-briiliant-white-gloss-1lt-1-copy.jpg',
    price: 2300000,
    salePrice: null,
    rating: 4.8,
    ratingCount: 65,
    slug: 'son-nuoc-dulux-hight-gloss',
    category: 'son',
    categories: ['son', 'son-noi-that'],
    brand: 'Dulux',
    isInStock: true,
    shortDescription: 'Là sơn nước trong nhà chất lượng cao, có màu đẹp và lâu phai',
    isHot: true,
  },
  {
    id: 6,
    name: 'Sơn nước Dulux Stain Block',
    image: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/products/dulux-trade-pure-briiliant-white-gloss-1lt-1-copy.jpg',
    price: 2150000,
    salePrice: 2100000,
    rating: 4.6,
    ratingCount: 42,
    slug: 'son-nuoc-dulux-stain-block',
    category: 'son',
    categories: ['son', 'son-noi-that'],
    brand: 'Dulux',
    isInStock: true,
    shortDescription: 'Là sơn nước trong nhà chất lượng cao, có màu đẹp và lâu phai',
    isHot: true,
  },
  {
    id: 7,
    name: 'Sơn nước JOTUN Majestic',
    image: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/products/jotun-true-beauty-sheen-5l.jpg',
    price: 1250000,
    salePrice: 1200000,
    rating: 4.9,
    ratingCount: 78,
    slug: 'son-nuoc-jotun-majestic',
    category: 'son',
    categories: ['son', 'son-noi-that'],
    brand: 'JOTUN',
    isInStock: true,
    shortDescription: 'JOTUN là hãng sơn được thành lập bởi sự hợp tác khoa học',
    isNew: true,
  },
  // ...other products
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