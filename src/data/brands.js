// Danh sách các thương hiệu sản phẩm
// Được sử dụng trong filter sản phẩm và hiển thị thông tin sản phẩm

export const brands = [
  {
    id: 1,
    name: 'Hà Tiên',
    slug: 'ha-tien',
    categories: ['vat-lieu-xay-dung'],
    logo: '/src/assets/images/brand-hatien.png',
  },
  {
    id: 2,
    name: 'Đồng Tâm',
    slug: 'dong-tam',
    categories: ['vat-lieu-xay-dung'],
    logo: '/src/assets/images/brand-dongtam.png',
  },
  {
    id: 3,
    name: 'Dulux',
    slug: 'dulux',
    categories: ['son-phu-kien'],
    logo: '/src/assets/images/brand-dulux.png',
  },
  {
    id: 4,
    name: 'Jotun',
    slug: 'jotun',
    categories: ['son-phu-kien'],
    logo: '/src/assets/images/brand-jotun.png',
  },
  {
    id: 5,
    name: 'Pomina',
    slug: 'pomina',
    categories: ['vat-lieu-xay-dung'],
    logo: '/src/assets/images/brand-pomina.png',
  },
  {
    id: 6,
    name: 'Bình Minh',
    slug: 'binh-minh',
    categories: ['vat-tu-cap-thoat-nuoc'],
    logo: '/src/assets/images/brand-binhminh.png',
  },
  {
    id: 7,
    name: 'Cadisun',
    slug: 'cadisun',
    categories: ['thiet-bi-dien'],
    logo: '/src/assets/images/brand-cadisun.png',
  },
  {
    id: 8,
    name: 'Cadivi',
    slug: 'cadivi',
    categories: ['thiet-bi-dien'],
    logo: '/src/assets/images/brand-cadivi.png',
  },
  {
    id: 9,
    name: 'TOTO',
    slug: 'toto',
    categories: ['vat-tu-cap-thoat-nuoc'],
    logo: '/src/assets/images/brand-toto.png',
  },
  {
    id: 10,
    name: 'Viglacera',
    slug: 'viglacera',
    categories: ['vat-lieu-xay-dung'],
    logo: '/src/assets/images/brand-viglacera.png',
  },
  {
    id: 11,
    name: 'Bosch',
    slug: 'bosch',
    categories: ['dung-cu-xay-dung'],
    logo: '/src/assets/images/brand-bosch.png',
  },
  {
    id: 12,
    name: 'Weber',
    slug: 'weber',
    categories: ['vat-lieu-xay-dung'],
    logo: '/src/assets/images/brand-weber.png',
  },
  {
    id: 13,
    name: 'Yale',
    slug: 'yale',
    categories: ['vat-lieu-noi-that'],
    logo: '/src/assets/images/brand-yale.png',
  },
];

// Lấy danh sách tên thương hiệu để sử dụng trong filter
export const getBrandNames = () => {
  return brands.map(brand => brand.name);
};

// Lấy thương hiệu theo slug
export const getBrandBySlug = (slug) => {
  return brands.find(brand => brand.slug === slug);
};

// Lọc thương hiệu theo danh mục
export const getBrandsByCategory = (categorySlug) => {
  if (!categorySlug) return brands;
  return brands.filter(brand => brand.categories.includes(categorySlug));
};