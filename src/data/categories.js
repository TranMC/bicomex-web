// Danh sách các danh mục sản phẩm
// Được sử dụng trong các component và trang để hiển thị, lọc và tìm kiếm sản phẩm

export const categories = [
  {
    id: 1,
    name: 'Vật liệu xây dựng',
    slug: 'vat-lieu-xay-dung',
    image: '/src/assets/images/category-building.jpg',
    description: 'Các vật liệu cơ bản để xây dựng công trình như xi măng, gạch, đá, cát, sỏi...',
  },
  {
    id: 2,
    name: 'Sơn & Phụ kiện',
    slug: 'son-phu-kien',
    image: '/src/assets/images/category-paint.jpg',
    description: 'Các loại sơn nội thất, ngoại thất và phụ kiện sơn chất lượng cao',
  },
  {
    id: 3,
    name: 'Thiết bị điện',
    slug: 'thiet-bi-dien',
    image: '/src/assets/images/category-electrical.jpg',
    description: 'Thiết bị điện, dụng cụ điện và vật tư điện dân dụng và công nghiệp',
  },
  {
    id: 4,
    name: 'Dụng cụ xây dựng',
    slug: 'dung-cu-xay-dung',
    image: '/src/assets/images/category-tools.jpg',
    description: 'Các loại dụng cụ, máy móc phục vụ thi công xây dựng',
  },
  {
    id: 5,
    name: 'Vật liệu nội thất',
    slug: 'vat-lieu-noi-that',
    image: '/src/assets/images/category-interior.jpg',
    description: 'Vật liệu và phụ kiện dùng trong hoàn thiện nội thất',
  },
  {
    id: 6,
    name: 'Vật tư cấp thoát nước',
    slug: 'vat-tu-cap-thoat-nuoc',
    image: '/src/assets/images/category-plumbing.jpg',
    description: 'Thiết bị và vật tư phục vụ hệ thống cấp thoát nước',
  },
];

// Hàm lấy danh mục theo slug
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};

// Hàm lấy tên danh mục từ slug
export const getCategoryNameBySlug = (slug) => {
  const category = getCategoryBySlug(slug);
  return category ? category.name : 'Tất cả sản phẩm';
};