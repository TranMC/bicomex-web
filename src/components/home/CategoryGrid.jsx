import { Link } from 'react-router-dom';
import '../../styles/components/CategoryGrid.css';

export const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: 'Vật liệu xây dựng',
      image: '/src/assets/images/category-building.jpg',
      slug: 'vat-lieu-xay-dung',
    },
    {
      id: 2,
      name: 'Sơn & Phụ kiện',
      image: '/src/assets/images/category-paint.jpg',
      slug: 'son-phu-kien',
    },
    {
      id: 3,
      name: 'Thiết bị điện',
      image: '/src/assets/images/category-electrical.jpg',
      slug: 'thiet-bi-dien',
    },
    {
      id: 4,
      name: 'Dụng cụ xây dựng',
      image: '/src/assets/images/category-tools.jpg',
      slug: 'dung-cu-xay-dung',
    },
    {
      id: 5,
      name: 'Vật liệu nội thất',
      image: '/src/assets/images/category-interior.jpg',
      slug: 'vat-lieu-noi-that',
    },
    {
      id: 6,
      name: 'Vật tư cấp thoát nước',
      image: '/src/assets/images/category-plumbing.jpg',
      slug: 'vat-tu-cap-thoat-nuoc',
    },
  ];

  return (
    <section className="category-grid py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Danh mục sản phẩm</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/san-pham/${category.slug}`}
            className="category-card"
          >
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative pb-[100%]">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-white text-center">
                <h3 className="font-medium">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};