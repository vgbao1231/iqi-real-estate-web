'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  MapPin,
  Info,
  Home,
  Camera,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ClipboardList,
  Handshake,
  Ruler,
  Bed,
  Bath,
  TreePine,
  Dumbbell,
  ShowerHeadIcon as SwimmingPool,
  Baby,
  School,
  Hospital,
  ShoppingBag,
  ShieldCheck,
  Wifi,
  Sparkles,
  Star,
  Building2,
  ExternalLink,
  Flame,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/common/animations';
import Introduction from './sections/Introduction';
import Overview from './sections/Overview';
import { formatVnCurrencyShort } from '@/lib/utils';
import Contact from '@/components/sections/contact';
import Amenities from './sections/Amenities';
import FloorPlan from './sections/FloorPlan';
import Product from './sections/Product';
import Location from './sections/Location';

/* -------------------------------------------------------------------------- */
/*                         DUMMY PROPERTY – STATIC DATA                       */
/* -------------------------------------------------------------------------- */
const property = {
  id: 1,
  name: 'Vinhomes Grand Park',
  slug: 'vinhomes-grand-park',
  address: 'Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, TP.HCM',
  city: 'TP.HCM',
  district: 'Quận 9',
  country: 'Vietnam',
  coordinates: { lat: 10.8411, lng: 106.8066 },

  // Pricing
  currency: 'USD',
  minPrice: 5200000,
  maxPrice: 9800000,
  landArea: 300,
  minBuildUp: 20,
  maxBuildUp: 35,
  minBedroom: 3,
  maxBedroom: 6,
  minBathroom: 3,
  maxBathroom: 5,
  measurementUnit: 'm²',

  // Property Details
  propertyType: 'Căn hộ',
  propertyGroup: 'Residential',
  status: 'Sẵn sàng',
  occupancyStatus: 'Ready',
  tenure: 'Leasehold',
  phase: 'Phase 1',
  developer: 'Vinhomes',
  completion: 'Q4/2024',
  listedOn: '2023-01-15T10:00:00Z',
  lastUpdated: '2024-07-15T14:30:00Z',
  totalUnits: '10,000+',
  handoverDate: 'Q4/2024 - Q2/2025',
  legalStatus: 'Đã có sổ hồng',

  // Special Options
  isFeatured: true,
  isExclusive: false,
  enableLiveSales: true,
  visibleOnWeb: true,

  // Images
  images: Array(12).fill('/placeholder-2.webp?height=600&width=800'), // More images for carousel

  // For "Giới thiệu" tab
  introductionMainImage: '/placeholder-2.webp?height=700&width=1200',
  introductionGallery: [
    '/placeholder-2.webp?height=400&width=600',
    '/placeholder-2.webp?height=400&width=600',
    '/placeholder-2.webp?height=400&width=600',
    '/placeholder-2.webp?height=400&width=600',
  ],
  introductionText: `
      Vinhomes Grand Park là khu đô thị sinh thái thông minh quy mô lớn nhất khu Đông TP.HCM với quy mô 271ha, bao gồm công viên trung tâm 36ha cùng hệ thống tiện ích đẳng cấp 5 sao. Dự án được thiết kế theo mô hình thành phố trong công viên với không gian xanh chiếm tới 70% tổng diện tích. Với vị trí đắc địa, tiện ích đa dạng và thiết kế hiện đại, Vinhomes Grand Park hứa hẹn mang đến một cuộc sống đẳng cấp và tiện nghi cho cư dân.

      Được phát triển bởi tập đoàn Vingroup, một trong những nhà phát triển bất động sản hàng đầu Việt Nam, Vinhomes Grand Park không chỉ đảm bảo chất lượng xây dựng và tiến độ bàn giao mà còn mang đến một hệ sinh thái sống toàn diện. Từ giáo dục (Vinschool), y tế (Vinmec), mua sắm (Vincom Mega Mall) đến vui chơi giải trí, mọi nhu cầu của cư dân đều được đáp ứng ngay trong nội khu. Đây là một lựa chọn an cư lý tưởng và cơ hội đầu tư hấp dẫn với tiềm năng tăng giá cao trong tương lai.
      `,

  // For "Tổng quan" tab
  overviewImage: '/placeholder-2.webp?height=600&width=1000',
  overviewSummary: `
      Vinhomes Grand Park là một siêu đô thị hiện đại, được quy hoạch đồng bộ với đầy đủ tiện ích sống, làm việc và giải trí. Dự án nổi bật với công viên 36ha, hệ thống an ninh thông minh và cộng đồng cư dân văn minh.
      `,

  // Amenities & Features (For "Tiện ích" tab)
  amenityClusters: [
    {
      title: 'Không gian xanh và công viên',
      image: '/placeholder-2.webp?height=600&width=1000',
      description: `
          Công viên Grand Park rộng 36ha với 15 chủ đề khác nhau mang đến không gian xanh mát, trong lành và vô vàn hoạt động giải trí cho mọi lứa tuổi. Cư dân có thể tận hưởng các buổi dã ngoại, tập thể dục, hay đơn giản là thư giãn giữa thiên nhiên ngay tại ngưỡng cửa nhà mình.
          `,
      icons: [
        { name: 'TreePine', component: TreePine },
        { name: 'Flame', component: Flame },
      ],
    },
    {
      title: 'Tiện ích thể thao và giải trí',
      image: '/placeholder-2.webp?height=600&width=1000',
      description: `
          Hệ thống hồ bơi vô cực, phòng gym hiện đại, sân thể thao đa năng (tennis, bóng rổ) đáp ứng nhu cầu rèn luyện sức khỏe. Khu BBQ ngoài trời và sân chơi trẻ em liên hoàn mang đến không gian vui chơi, gắn kết gia đình.
          `,
      icons: [
        { name: 'SwimmingPool', component: SwimmingPool },
        { name: 'Dumbbell', component: Dumbbell },
        { name: 'Baby', component: Baby },
      ],
    },
    {
      title: 'Hệ sinh thái giáo dục và y tế',
      image: '/placeholder-2.webp?height=600&width=1000',
      description: `
          Trường học quốc tế Vinschool và bệnh viện đa khoa Vinmec ngay trong nội khu đảm bảo chất lượng giáo dục và chăm sóc sức khỏe hàng đầu cho cư dân. Mọi nhu cầu thiết yếu đều được đáp ứng ngay tại ngưỡng cửa.
          `,
      icons: [
        { name: 'School', component: School },
        { name: 'Hospital', component: Hospital },
      ],
    },
    {
      title: 'Mua sắm và dịch vụ',
      image: '/placeholder-2.webp?height=600&width=1000',
      description: `
          Trung tâm thương mại Vincom Mega Mall mang đến trải nghiệm mua sắm, ẩm thực và giải trí đẳng cấp. Cùng với đó là các dịch vụ quản lý, vận hành chuyên nghiệp, an ninh 24/7 và wifi miễn phí toàn khu.
          `,
      icons: [
        { name: 'ShoppingBag', component: ShoppingBag },
        { name: 'ShieldCheck', component: ShieldCheck },
        { name: 'Wifi', component: Wifi },
        { name: 'Sparkles', component: Sparkles },
      ],
    },
  ],
  amenities: [
    { name: 'Hồ bơi vô cực', icon: 'SwimmingPool' },
    { name: 'Gym hiện đại', icon: 'Dumbbell' },
    { name: 'Công viên ánh sáng 36ha', icon: 'TreePine' },
    { name: 'Trường học quốc tế Vinschool', icon: 'School' },
    { name: 'Bệnh viện đa khoa Vinmec', icon: 'Hospital' },
    { name: 'Trung tâm thương mại Vincom Mega Mall', icon: 'ShoppingBag' },
    { name: 'An ninh 24/7 với công nghệ AI', icon: 'ShieldCheck' },
    { name: 'Hệ thống thang máy tốc độ cao', icon: 'ArrowUpFromLine' },
    { name: 'Hầm để xe thông minh', icon: 'Car' },
    { name: 'Sân chơi trẻ em liên hoàn', icon: 'Baby' },
    { name: 'Khu BBQ ngoài trời', icon: 'Flame' },
    { name: 'Phòng sinh hoạt cộng đồng', icon: 'Users' },
    { name: 'Wifi miễn phí toàn khu', icon: 'Wifi' },
    { name: 'Dịch vụ dọn dẹp chuyên nghiệp', icon: 'Sparkles' },
  ],

  // For "Vị trí" tab
  locationMainImage: '/placeholder-2.webp?height=600&width=1000',
  locationDescription: `
      Vinhomes Grand Park tọa lạc tại vị trí chiến lược phía Đông TP.HCM, ngay cửa ngõ kết nối các tỉnh miền Đông Nam Bộ. Vị trí này không chỉ thuận tiện di chuyển đến trung tâm thành phố mà còn dễ dàng tiếp cận các khu công nghệ cao, khu công nghiệp lớn, mang lại tiềm năng phát triển vượt trội.

      Với sự phát triển mạnh mẽ của hạ tầng giao thông khu vực như tuyến Metro số 1, đường Vành đai 3, và cao tốc Long Thành - Dầu Giây, cư dân Vinhomes Grand Park dễ dàng di chuyển đến các khu vực trọng điểm của TP.HCM và các tỉnh lân cận. Đồng thời, dự án còn được bao quanh bởi các tiện ích ngoại khu đa dạng như trường đại học, bệnh viện quốc tế, và khu du lịch, tạo nên một môi trường sống tiện nghi và đầy đủ.
      `,
  locationHighlights: [
    {
      title: 'Kết nối giao thông',
      description:
        'Gần tuyến Metro số 1, Vành đai 3, cao tốc Long Thành - Dầu Giây.',
      icon: 'Car',
    },
    {
      title: 'Tiện ích ngoại khu',
      description:
        'Gần các trường đại học, bệnh viện quốc tế, khu du lịch Suối Tiên.',
      icon: 'MapPin',
    },
    {
      title: 'Phát triển hạ tầng',
      description:
        'Khu vực đang được đầu tư mạnh mẽ vào hạ tầng, thu hút dân cư và doanh nghiệp.',
      icon: 'Building2',
    },
  ],
  locationGallery: [
    '/placeholder-2.webp?height=400&width=600',
    '/placeholder-2.webp?height=400&width=600',
    '/placeholder-2.webp?height=400&width=600',
    '/placeholder-2.webp?height=400&width=600',
    '/placeholder-2.webp?height=400&width=600',
    '/placeholder-2.webp?height=400&width=600',
  ],

  // For "Mặt bằng" tab
  overallFloorPlan: {
    image: '/placeholder-2.webp?height=800&width=1200',
    description: `
        Mặt bằng tổng thể của Vinhomes Grand Park được quy hoạch thông minh, tối ưu không gian xanh và tiện ích. Các tòa nhà được bố trí hợp lý, đảm bảo tầm nhìn thoáng đãng và không khí trong lành cho từng căn hộ. Quy hoạch tổng thể chú trọng đến sự hài hòa giữa kiến trúc và cảnh quan thiên nhiên, tạo nên một không gian sống đẳng cấp và bền vững.
        `,
  },
  subAreaFloorPlans: [
    {
      name: 'Phân khu The Rainbow',
      image: '/placeholder-2.webp?height=700&width=1200',
      description: `
          The Rainbow là phân khu đầu tiên được ra mắt tại Vinhomes Grand Park, nổi bật với thiết kế hiện đại, đa dạng loại hình căn hộ và hệ thống tiện ích nội khu phong phú, mang đến không gian sống năng động và tiện nghi. Phân khu này được thiết kế với các tòa căn hộ cao tầng, tối ưu hóa tầm nhìn và ánh sáng tự nhiên, tạo nên một môi trường sống lý tưởng cho cư dân trẻ và năng động.
          `,
    },
    {
      name: 'Phân khu The Origami',
      image: '/placeholder-2.webp?height=700&width=1200',
      description: `
          The Origami mang phong cách Nhật Bản tinh tế, với cảnh quan zen garden, hồ cá Koi và các tiện ích độc đáo, tạo nên một không gian sống yên bình và hài hòa giữa lòng đô thị sôi động. Các căn hộ tại The Origami được thiết kế tỉ mỉ, chú trọng đến từng chi tiết nhỏ, mang đến sự thoải mái và tiện nghi tối đa cho cư dân.
          `,
    },
    {
      name: 'Phân khu The Manhattan',
      image: '/placeholder-2.webp?height=700&width=1200',
      description: `
          The Manhattan là phân khu thấp tầng đẳng cấp với các biệt thự, nhà phố và shophouse sang trọng, mang đến không gian sống riêng tư và tiện nghi tối đa. Với kiến trúc hiện đại và quy hoạch đồng bộ, The Manhattan là lựa chọn lý tưởng cho những gia đình tìm kiếm sự sang trọng và đẳng cấp.
          `,
    },
    {
      name: 'Phân khu The Beverly',
      image: '/placeholder-2.webp?height=700&width=1200',
      description: `
          The Beverly là phân khu căn hộ cao cấp nhất tại Vinhomes Grand Park, với thiết kế sang trọng, tầm nhìn panorama và các tiện ích đặc quyền như hồ bơi trên cao, phòng gym hiện đại, và sảnh lounge đẳng cấp. Đây là biểu tượng của cuộc sống thượng lưu, nơi cư dân có thể tận hưởng mọi tiện nghi cao cấp nhất.
          `,
    },
  ],

  // For "Sản phẩm" tab
  products: [
    {
      name: 'Căn hộ Studio',
      image: '/placeholder-2.webp?height=400&width=600',
      description: `Căn hộ Studio diện tích 30-35m², thiết kế thông minh, tối ưu không gian, phù hợp cho người độc thân hoặc đầu tư cho thuê. Đây là lựa chọn lý tưởng cho những ai tìm kiếm một không gian sống hiện đại, tiện nghi và chi phí hợp lý.`,
      price: '1.8 - 2.5 tỷ',
      details: [
        { label: 'Diện tích', value: '30-35m²', icon: Ruler },
        { label: 'Phòng ngủ', value: 'Studio', icon: Bed },
        { label: 'Phòng tắm', value: '1', icon: Bath },
      ],
    },
    {
      name: 'Căn hộ 1PN',
      image: '/placeholder-2.webp?height=400&width=600',
      description: `Căn hộ 1 phòng ngủ diện tích 50-65m², thiết kế tối ưu không gian, phù hợp cho người độc thân hoặc cặp đôi trẻ. Với không gian riêng tư và đầy đủ tiện nghi, đây là tổ ấm lý tưởng cho cuộc sống hiện đại.`,
      price: '3.2 - 4.1 tỷ',
      details: [
        { label: 'Diện tích', value: '50-65m²', icon: Ruler },
        { label: 'Phòng ngủ', value: '1', icon: Bed },
        { label: 'Phòng tắm', value: '1', icon: Bath },
      ],
    },
    {
      name: 'Căn hộ 2PN',
      image: '/placeholder-2.webp?height=400&width=600',
      description: `Căn hộ 2 phòng ngủ diện tích 70-85m², không gian sống rộng rãi, lý tưởng cho gia đình nhỏ. Thiết kế thông minh giúp tối đa hóa diện tích sử dụng, mang lại sự thoải mái và tiện nghi cho mọi thành viên.`,
      price: '4.5 - 5.8 tỷ',
      details: [
        { label: 'Diện tích', value: '70-85m²', icon: Ruler },
        { label: 'Phòng ngủ', value: '2', icon: Bed },
        { label: 'Phòng tắm', value: '2', icon: Bath },
      ],
    },
    {
      name: 'Căn hộ 3PN',
      image: '/placeholder-2.webp?height=400&width=600',
      description: `Căn hộ 3 phòng ngủ diện tích 90-120m², thiết kế sang trọng, phù hợp cho gia đình đa thế hệ. Với không gian rộng lớn và nhiều phòng chức năng, đây là lựa chọn hoàn hảo cho cuộc sống tiện nghi và đẳng cấp.`,
      price: '6.2 - 8.5 tỷ',
      details: [
        { label: 'Diện tích', value: '90-120m²', icon: Ruler },
        { label: 'Phòng ngủ', value: '3', icon: Bed },
        { label: 'Phòng tắm', value: '2-3', icon: Bath },
      ],
    },
    {
      name: 'Biệt thự song lập',
      image: '/placeholder-2.webp?height=400&width=600',
      description: `Biệt thự song lập với diện tích lớn, thiết kế hiện đại, sân vườn rộng rãi, mang đến không gian sống đẳng cấp và riêng tư cho gia đình. Tận hưởng cuộc sống xanh mát và tiện nghi với đầy đủ các tiện ích cao cấp.`,
      price: '15 - 25 tỷ',
      details: [
        { label: 'Diện tích đất', value: '200-300m²', icon: Ruler },
        { label: 'Số tầng', value: '3', icon: Building2 },
        { label: 'Phòng ngủ', value: '4-5', icon: Bed },
        { label: 'Sân vườn', value: 'Có', icon: TreePine },
      ],
    },
    {
      name: 'Shophouse',
      image: '/placeholder-2.webp?height=400&width=600',
      description: `Shophouse mặt tiền đường lớn, thiết kế đa năng vừa ở vừa kinh doanh, tiềm năng sinh lời cao. Vị trí đắc địa, thuận lợi cho việc phát triển kinh doanh và mang lại nguồn thu nhập ổn định.`,
      price: '18 - 30 tỷ',
      details: [
        { label: 'Diện tích sàn', value: '100-150m²', icon: Ruler },
        { label: 'Số tầng', value: '3-5', icon: Building2 },
        { label: 'Mặt tiền', value: 'Lớn', icon: ExternalLink },
        { label: 'Tiềm năng kinh doanh', value: 'Cao', icon: TrendingUp },
      ],
    },
  ],

  // For "Chính sách" section
  policies: [
    {
      title: 'Chính sách thanh toán linh hoạt',
      description: `Hỗ trợ nhiều phương thức thanh toán, trả góp lãi suất ưu đãi từ các ngân hàng đối tác như Techcombank, Vietcombank, BIDV.`,
    },
    {
      title: 'Ưu đãi đặc biệt cho khách hàng thân thiết',
      description: `Giảm giá đặc biệt và quà tặng hấp dẫn cho khách hàng đã từng mua sản phẩm của Vinhomes.`,
    },
    {
      title: 'Hỗ trợ vay vốn ngân hàng lên đến 70%',
      description: `Liên kết với các ngân hàng lớn, hỗ trợ vay lên đến 70% giá trị căn hộ với thời hạn dài (lên đến 35 năm).`,
    },
    {
      title: 'Chính sách bàn giao đúng tiến độ và chất lượng',
      description: `Cam kết bàn giao đúng tiến độ, đảm bảo chất lượng công trình và nội thất theo cam kết trong hợp đồng.`,
    },
    {
      title: 'Chính sách quản lý và vận hành chuyên nghiệp',
      description: `Dự án được quản lý và vận hành bởi Vinhomes, đảm bảo chất lượng dịch vụ cao cấp, an ninh 24/7.`,
    },
    {
      title: 'Chính sách bảo hành và hậu mãi',
      description: `Chính sách bảo hành rõ ràng, minh bạch cho các hạng mục công trình và thiết bị nội thất.`,
    },
  ],
  features: [
    'Vị trí đắc địa, kết nối giao thông thuận tiện',
    'Tiện ích nội khu và ngoại khu đa dạng, đẳng cấp',
    'Thiết kế hiện đại, tối ưu không gian sống',
    'Chủ đầu tư uy tín, kinh nghiệm lâu năm',
    'Tiềm năng tăng giá cao trong tương lai',
    'Môi trường sống xanh, trong lành',
    'An ninh 24/7, đảm bảo an toàn',
    'Cộng đồng cư dân văn minh, thân thiện',
  ],
  views: 12345,
};

/* -------------------------------------------------------------------------- */

export default function ResortProductDetailPage() {
  /* ---------- Local state ---------- */
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [dialogCurrentImageIndex, setDialogCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [activeSection, setActiveSection] = useState('introduction'); // State to manage active section

  const handleOpenImageDialog = () => {
    setDialogCurrentImageIndex(activeImageIndex);
    setShowAllImages(true);
  };

  const handlePrevImage = () => {
    setDirection(-1);
    setDialogCurrentImageIndex((i) =>
      i === 0 ? property.images.length - 1 : i - 1
    );
  };
  const handleNextImage = () => {
    setDirection(1);
    setDialogCurrentImageIndex((i) =>
      i === property.images.length - 1 ? 0 : i + 1
    );
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const sections = [
    {
      id: 'introduction',
      content: <Introduction property={property} />,
    },
    {
      id: 'general-overview',
      content: <Overview property={property} />,
    },
    {
      id: 'amenities',
      content: <Amenities property={property} />,
    },
    {
      id: 'location',
      content: <Location property={property} />,
    },
    {
      id: 'floorplans',
      content: <FloorPlan property={property} />,
    },
    {
      id: 'products',
      content: <Product property={property} />,
    },
  ];

  /* ============================== RENDER ============================== */
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-white">
      {/* ----------------------------------------------------------------------- */}
      {/* Header – transparent overlay                                            */}
      {/* ----------------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 z-50 w-full bg-black/15 backdrop-blur-md py-2">
        <div className="mx-auto flex items-center justify-between overflow-x-auto px-4 scrollbar-hide">
          <Link
            href="/products/resort"
            className="text-white transition-colors rounded-full hover:bg-black/5 p-2 w-10 h-10 center-both"
          >
            <ArrowLeft strokeWidth={2.75} className="h-4 w-4" />
          </Link>

          <nav className="flex flex-grow justify-center space-x-6">
            {[
              { id: 'introduction', label: 'Giới thiệu', icon: Info },
              {
                id: 'general-overview',
                label: 'Tổng quan',
                icon: ClipboardList,
              },
              { id: 'amenities', label: 'Tiện ích', icon: Star },
              { id: 'location', label: 'Vị trí', icon: MapPin },
              { id: 'floorplans', label: 'Mặt bằng', icon: LayoutGrid },
              { id: 'products', label: 'Sản phẩm', icon: Home },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`text-white hover:text-white hover:font-bold hover:bg-background/20 ${isActive ? 'bg-background/20 font-bold' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ----------------------------------------------------------------------- */}
      {/* Hero Section – header overlays, so no padding-top                        */}
      {/* ----------------------------------------------------------------------- */}
      <FadeIn>
        <div className="relative">
          {/* Image Gallery */}
          <div className="relative h-[70vh] overflow-hidden">
            <Image
              src={property.images[activeImageIndex] || '/placeholder-2.webp'}
              alt={property.name}
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Property Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-4xl">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.isFeatured && (
                    <Badge className="bg-gradient-to-r !from-yellow-500 !to-orange-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Nổi bật
                    </Badge>
                  )}
                  {property.isExclusive && (
                    <Badge className="bg-gradient-to-r !from-green-500 !to-green-600 text-white border-0">
                      Độc quyền
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {property.name}
                </h1>

                <div className="flex items-center text-lg mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.address}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-200">
                      Từ {formatVnCurrencyShort(property.minPrice)}
                    </div>
                    <div className="text-white/80">Giá</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-200">
                      {property.landArea}
                      {property.measurementUnit === 'sqm' ? 'm²' : 'ft²'}
                    </div>
                    <div className="text-white/80">Diện tích</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-200">
                      {property.minBedroom}-{property.maxBedroom}
                    </div>
                    <div className="text-white/80">Phòng ngủ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="absolute bottom-6 right-8 center-both gap-2 z-10">
            {property.images.slice(0, 3).map((image: any, index: any) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-16 h-12 rounded-md overflow-hidden border transition-all ${
                  activeImageIndex === index
                    ? 'border-white'
                    : 'border-white/50'
                }`}
              >
                <Image
                  src={image || '/placeholder-2.webp'}
                  alt={`${property.name} ${index + 1}`}
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {property.images.length > 3 && (
              <button
                onClick={handleOpenImageDialog}
                className="w-16 h-12 rounded-md bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-xs font-medium border-2 border-white/50"
              >
                +{property.images.length - 3}
              </button>
            )}
            {/* Image Counter */}
            <Button
              variant="secondary"
              className="backdrop-blur-sm bg-black/50 text-white hover:bg-black/70 ml-4"
              onClick={handleOpenImageDialog}
            >
              <Camera className="w-4 h-4 mr-2" />
              {activeImageIndex + 1} / {property.images.length}
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* ----------------------------------------------------------------------- */}
      {/* Conditional sections                                                    */}
      {/* ----------------------------------------------------------------------- */}
      <div className="py-12">
        {sections.map(
          (section) =>
            activeSection === section.id && (
              <section
                key={section.id}
                id={section.id}
                className="mx-auto max-w-7xl space-y-8 px-4"
              >
                {section.content}
              </section>
            )
        )}
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/* Always-visible blocks                                                    */}
      {/* ----------------------------------------------------------------------- */}
      <FadeIn delay={0.7}>
        <section id="policies" className="w-full bg-background py-12">
          <div className="mx-auto max-w-7xl space-y-8 px-4">
            <h3 className="mb-4 flex items-center text-2xl font-bold text-orange-600 ">
              <Handshake className="mr-3 h-6 w-6" />
              Chính sách & Ưu đãi
            </h3>
            {property.policies.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border-l-4 border-orange-600 p-6 bg-card shadow-md"
              >
                <h4 className="mb-2 text-lg font-semibold text-orange-600">
                  {p.title}
                </h4>
                <p className="leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.8}>
        <Contact />
      </FadeIn>

      {/* ----------------------------------------------------------------------- */}
      {/* Image dialog                                                             */}
      {/* ----------------------------------------------------------------------- */}
      <Dialog open={showAllImages} onOpenChange={setShowAllImages}>
        <DialogContent className="max-w-5xl p-6">
          <DialogHeader>
            <DialogTitle>Tất cả hình ảnh của {property.name}</DialogTitle>
          </DialogHeader>
          <div className="relative mb-4 h-[60vh] w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={dialogCurrentImageIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={
                    property.images[dialogCurrentImageIndex] ||
                    '/placeholder-2.webp'
                  }
                  alt={`${property.name} – Image ${dialogCurrentImageIndex + 1}`}
                  fill
                  className="rounded-lg object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <Badge className="absolute bottom-2 right-2 z-10 bg-black/70 text-white">
              {dialogCurrentImageIndex + 1} / {property.images.length}
            </Badge>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {property.images.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setDirection(i > dialogCurrentImageIndex ? 1 : -1);
                  setDialogCurrentImageIndex(i);
                }}
                className={`flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 ${
                  dialogCurrentImageIndex === i
                    ? 'border-blue-600'
                    : 'border-transparent'
                }`}
              >
                <Image
                  src={img || '/placeholder-2.webp'}
                  alt={`${property.name} thumb ${i + 1}`}
                  width={120}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
