export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: 'hot' | 'new' | 'sale';
  discount?: number;
  stock: number;
  description: string;
}

export const products: Product[] = [
  // Đèn
  {
    id: 1,
    name: 'Bóng đèn LED Philips 9W E27 ánh sáng trắng',
    price: 45000,
    oldPrice: 58000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    category: 'Đèn',
    rating: 4.8,
    reviews: 512,
    badge: 'hot',
    discount: 22,
    stock: 200,
    description: 'Bóng đèn LED Philips 9W đui E27, ánh sáng trắng 6500K, tuổi thọ 15.000 giờ, tiết kiệm 80% điện so với đèn sợi đốt. Chống bụi, chịu nhiệt tốt.'
  },
  {
    id: 2,
    name: 'Đèn LED ống Rạng Đông 1.2m 36W',
    price: 125000,
    oldPrice: 155000,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop',
    category: 'Đèn',
    rating: 4.7,
    reviews: 289,
    badge: 'sale',
    discount: 19,
    stock: 85,
    description: 'Đèn LED tube Rạng Đông T8 1.2m 36W, độ sáng 3600 lumen, CRI > 80, thích hợp cho nhà xưởng, văn phòng, siêu thị. Bảo hành 2 năm.'
  },
  {
    id: 3,
    name: 'Đèn downlight âm trần LED 7W tròn',
    price: 72000,
    oldPrice: 95000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    category: 'Đèn',
    rating: 4.6,
    reviews: 176,
    badge: 'new',
    discount: 24,
    stock: 120,
    description: 'Đèn downlight LED âm trần 7W, lỗ khoét Ø90mm, ánh sáng trung tính 4000K. Vỏ nhôm tản nhiệt tốt, tuổi thọ 20.000 giờ. Phù hợp phòng khách, phòng ngủ.'
  },
  // Quạt
  {
    id: 4,
    name: 'Quạt trần Asia 1200mm 5 cánh gỗ',
    price: 890000,
    oldPrice: 1100000,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop',
    category: 'Quạt',
    rating: 4.7,
    reviews: 341,
    badge: 'hot',
    discount: 19,
    stock: 45,
    description: 'Quạt trần Asia 5 cánh gỗ tự nhiên, đường kính 1200mm, motor đồng 100%, 3 tốc độ, tiêu thụ 60W. Có điều khiển từ xa, đèn LED tích hợp 24W.'
  },
  {
    id: 5,
    name: 'Quạt đứng Panasonic F-EP405 40cm',
    price: 1250000,
    oldPrice: 1550000,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800&auto=format&fit=crop',
    category: 'Quạt',
    rating: 4.8,
    reviews: 203,
    badge: 'sale',
    discount: 19,
    stock: 32,
    description: 'Quạt đứng Panasonic F-EP405 cánh 40cm, 5 tốc độ gió, lồng lưới an toàn kép, hẹn giờ 7.5h, chế độ tự nhiên Natural Wind. Tiêu thụ 45W.'
  },
  {
    id: 6,
    name: 'Quạt bàn mini USB 15cm 2 tốc độ',
    price: 85000,
    oldPrice: 110000,
    image: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=800&auto=format&fit=crop',
    category: 'Quạt',
    rating: 4.4,
    reviews: 628,
    badge: 'hot',
    discount: 23,
    stock: 150,
    description: 'Quạt bàn mini cổng USB 5V, cánh 15cm, 2 mức tốc độ, chân đế chống trượt. Cổng USB tiêu chuẩn, dùng được với sạc điện thoại, powerbank, laptop.'
  },
  // Pin
  {
    id: 7,
    name: 'Pin AA Energizer Max vỉ 4 viên',
    price: 55000,
    oldPrice: 72000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    category: 'Pin',
    rating: 4.9,
    reviews: 847,
    badge: 'hot',
    discount: 24,
    stock: 500,
    description: 'Pin kiềm Energizer MAX AA 1.5V, vỉ 4 viên. Dung lượng vượt trội, không rò rỉ, bảo quản được 10 năm. Thích hợp điều khiển từ xa, đồng hồ, đồ chơi, đèn pin.'
  },
  {
    id: 8,
    name: 'Pin sạc AA Panasonic 2500mAh vỉ 2',
    price: 125000,
    oldPrice: 165000,
    image: 'https://images.unsplash.com/photo-1606806116070-0f4b2b5cc06b?q=80&w=800&auto=format&fit=crop',
    category: 'Pin',
    rating: 4.7,
    reviews: 234,
    badge: 'sale',
    discount: 24,
    stock: 180,
    description: 'Pin sạc NiMH Panasonic AA 2500mAh, vỉ 2 viên. Sạc được 500 lần, giữ điện 70% sau 1 năm. Tương thích máy sạc Panasonic và các loại máy sạc thông dụng.'
  },
  {
    id: 9,
    name: 'Pin CR2032 Lithium vỉ 5 viên',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop',
    category: 'Pin',
    rating: 4.8,
    reviews: 412,
    badge: 'new',
    stock: 300,
    description: 'Pin lithium CR2032 3V vỉ 5 viên, dùng cho đồng hồ đeo tay, remote xe hơi, cân điện tử, máy tính bỏ túi. Bảo quản 5 năm, nhiệt độ hoạt động -30°C đến +60°C.'
  },
  // Dây điện
  {
    id: 10,
    name: 'Dây điện đôi mềm Cadivi 2x1.0mm cuộn 100m',
    price: 285000,
    oldPrice: 350000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
    category: 'Dây điện',
    rating: 4.7,
    reviews: 156,
    badge: 'sale',
    discount: 19,
    stock: 60,
    description: 'Dây điện đôi mềm Cadivi 2x1.0mm², cuộn 100m, ruột đồng tinh khiết 99.9%, vỏ PVC chịu nhiệt 70°C, chịu điện áp 300/500V. Chứng nhận TCVN 5935.'
  },
  {
    id: 11,
    name: 'Dây cáp điện 3 lõi Cadivi 3x2.5mm 50m',
    price: 520000,
    oldPrice: 650000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    category: 'Dây điện',
    rating: 4.6,
    reviews: 98,
    discount: 20,
    stock: 30,
    description: 'Cáp điện 3 lõi Cadivi VCm 3x2.5mm², cuộn 50m, phù hợp lắp đặt điện dân dụng và công nghiệp nhẹ. Chịu nhiệt 70°C, điện áp 0.6/1kV. Dễ luồn ống.'
  },
  // Ổ cắm & Công tắc
  {
    id: 12,
    name: 'Ổ cắm điện 6 lỗ chống giật Lioa 3m',
    price: 185000,
    oldPrice: 235000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    category: 'Ổ cắm & Công tắc',
    rating: 4.8,
    reviews: 723,
    badge: 'hot',
    discount: 21,
    stock: 95,
    description: 'Ổ cắm điện Lioa 6 lỗ có dây dài 3m, chống giật, chống quá tải, có công tắc nguồn tổng. Chịu tải 2500W, cổng USB 5V/2.1A tích hợp. Chứng nhận an toàn TCVN.'
  }
];

export const categories = [
  { id: 1, name: 'Đèn', icon: '💡', slug: 'Đèn' },
  { id: 2, name: 'Quạt', icon: '🌀', slug: 'Quạt' },
  { id: 3, name: 'Pin', icon: '🔋', slug: 'Pin' },
  { id: 4, name: 'Dây điện', icon: '🔌', slug: 'Dây điện' },
  { id: 5, name: 'Ổ cắm & Công tắc', icon: '🔲', slug: 'Ổ cắm & Công tắc' },
  { id: 6, name: 'Phụ kiện điện', icon: '🔧', slug: 'Phụ kiện điện' },
];

export const formatPrice = (price: number) =>
  price.toLocaleString('vi-VN') + 'đ';
