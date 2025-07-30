'use client';

import { Fragment, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Arsenal } from 'next/font/google';

import Introduction from './sections/Introduction';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Overview from './sections/Overview';
import Contact from './sections/Contact';
import Location from './sections/Location';
import Production from './sections/Production';
import Amenity from './sections/Amenity';
import Policy from './sections/Policy';
import Timeline from './sections/Timeline';
import Agency from './sections/Agency';
import Cover from './sections/Cover';

const arsenal = Arsenal({
  subsets: ['latin'],
  weight: ['400', '700'], // Chỉ định độ đậm
  style: ['normal', 'italic'], // Thêm kiểu thường và nghiêng
  display: 'swap',
});

/* -------------------------------------------------------------------------- */
/*                         DUMMY PROPERTY – STATIC DATA                       */
/* -------------------------------------------------------------------------- */
const property = {
  id: 3,

  // Giới thiệu
  introduction: {
    coverImage: '/cover.jpg',
    titleImage: '/title.png',
    heroImage: '/hero.png',
    logoImages: ['/logo-retreat.png', '/logo-retreat-1.png'],
    introductionImages: ['/product-1.jpg', '/product-2.jpg', '/product-3.jpg'],
    introductionVideo: 'https://www.youtube.com/watch?v=pLL2g9_mZdo&t=94s',
    backgroundImage: '/background-hero-1.jpg',
    title: 'Trải nghiệm nghỉ dưỡng giữa thiên nhiên',

    description: `
      <p>Xây dựng mô hình khu đô thị trên thị trường không hiếm, nhưng kiến tạo môi trường đáng sống đúng nghĩa, mang đến những giá trị đích thực thì không phải dự án nào cũng làm được.</p>
      <p>Những khu đô thị xanh của Nhà sáng lập Ecopark là ngoại lệ - nơi mọi chủ nhân đều tự hào về quyết định sở hữu và đầu tư của mình.</p>
      <p>Chào mừng Quý Anh Chị đến với Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>
    `,
    launchTitle: 'RETREAT ISLAND',
    launchSubtitle: 'Biệt thự đảo giữa rừng retreat',
    launchText: `
  <p><span style="color: #ffd4aa;">✦</span> View 2 mặt hồ thiên nga ngay cạnh nhà, có hồ bơi & sân vườn riêng</p>
  <p><span style="color: #ffd4aa;">✦</span> Nằm trên 16 nhánh đảo riêng biệt, trung tâm của đô thị đáng sống nhất miền Nam</p>
  <p><span style="color: #ffd4aa;">✦</span> "Nhà giữa đảo - Đảo giữa rừng retreat" chưa từng có trên thị trường.</p>
`,
  },

  // Tổng quan
  overview: {
    overviewImages: [
      {
        image: '/product-overview.jpg',
        description: `
      <p>Khu đô thị “rừng retreat” đầu tiên của Ecopark</p>
    `,
      },
      {
        image: '/area-overview.jpg',
        description: `
      <p>Chiếm &gt; 121 ha với 4 triệu cây hoa, 8 tầng 8 lớp thực vật</p>
    `,
      },
      {
        image: '/amenity-overview.jpg',
        description: `
      <p><span style="color: #ffd4aa;">✦</span> Một khu phức hợp đầy đủ tiện ích</p>
      <p><span style="color: #ffd4aa;">✦</span> Một “rừng trị liệu” với các tiện ích phục hồi, tái tạo sức khỏe cạnh nhà</p>
    `,
      },
      {
        image: '/location-overview.jpg',
        description: `
      <p>Tọa độ giao thương huyết mạch của miền Nam, kết nối TP HCM & sân bay Long Thành chỉ khoảng 30 phút</p>
    `,
      },
    ],
    name: 'Eco Retreat',
    slug: 'eco-retreat-ecopark',
    developer: 'Ecopark',
    landscapeDesigner: 'PLA Studio',
    contractors: ['Coteccons', 'Ricons'],
    architects: [
      'Humphreys & Partners',
      'Alpes Green Design',
      'BNB Architects',
      'RSA Studio',
      '1+1>2',
      'MIA Design Studio',
    ],
    area: 220.05,
    legal: 'Sổ hồng sở hữu lâu dài',
    handover: 'Dự kiến Quý II/2028',
    address: 'Đường Nguyễn Hữu Trí, Xã Thanh Phú, Huyện Bến Lức, Long An',
    city: 'Long An',
    district: 'Bến Lức',
    country: 'Vietnam',
    backgroundImage: '/background-hero-2.jpg',
    experienceImage: '/experience-overview.webp',
    propertyGroup: 'Căn hộ, biệt thự nghỉ dưỡng', // → nhóm sản phẩm
    minBedroom: 1,
    maxBedroom: 4,
    minBathroom: 1,
    maxBathroom: 3,
    totalUnits: 1200, // Tổng số sản phẩm
    tenure: 'Lâu dài', // Tình trạng sở hữu
    propertyType: 'Khu đô thị sinh thái', // Loại hình
    phase: 'Giai đoạn 1', // Giai đoạn
    currency: 'VND',
    status: 'Đang mở bán', // Trạng thái
  },

  // Vị trí
  location: {
    title: `
  <p style="line-height: 1; font-size: 48px; color: #76c472;">Vị Trí Độc Tôn</p>
  <span style="font-size: 40px; font-style: italic;">
    <span style="color: #ffd4aa;">Không xa phố thị,</span>
    <span style="color: #76c472;"> đủ gần thiên nhiên</span>
  </span>
`,
    description: `
  <p style="color: #e3e3e3;">
    <span style="color: #f4cd7c;">✦</span>
    <em><strong>Tọa độ kết nối huyết mạch của phía Nam</strong></em><br />
    “Cửa ngõ” kết nối Đông - Tây của TP HCM, thuận tiện di chuyển đến các quận của Sài Gòn,
    sân bay Tân Sơn Nhất, các tỉnh Tây Nam Bộ và tương lai đến sân bay Long Thành chỉ khoảng 30 phút.
  </p>

  <p style="color: #e3e3e3;">
    <span style="color: #f4cd7c;">✦</span>
    <em><strong>Trung tâm mạng lưới logistics của miền Nam</strong></em><br />
    Giao điểm của Vành đai 3, Cao tốc TP HCM - Trung Lương, Cao tốc Bến Lức - Long Thành,
    kết nối thuận tiện đến hệ thống cao tốc, sân bay, cảng biển, khu công nghiệp, công nghệ cao,…
  </p>

  <p style="color: #e3e3e3;">
    <span style="color: #f4cd7c;">✦</span>
    <em><strong>Tâm điểm sinh thái – “Nhà nghỉ dưỡng” của cư dân thành phố</strong></em><br />
    Nằm nép mình bên dòng sông Bến Lức và len lỏi những dòng chảy sông, hồ uốn lượn quanh đô thị.
  </p>
`,
    locationImage: '/location.webp',
    coordinates: { lat: 10.75, lng: 106.4 },
    backgroundImage: '/background-hero-2.jpg',
  },

  // Sản phẩm
  production: {
    title: 'Sản phẩm',
    description: `✦ Biệt thự đảo giữa rừng retreat`,
    products: [
      {
        id: 1,
        name: 'Island Villa',
        image: '/product-1.jpg',
        description: `
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 16px;">
            <p><strong>Loại hình:</strong> Đơn lập, Song lập, Villa Rẻ quạt</p>
            <p><strong>Diện tích:</strong> 205m² - 484m²</p>
          </td>
          <td style="width: 50%; vertical-align: top;">
            <p><strong>Xây dựng:</strong> 2 tầng + 1 tum</p>
            <p><strong>Công năng:</strong> Để ở</p>
          </td>
        </tr>
      </table>
    `,
      },
      {
        id: 2,
        name: 'Shop Villa đảo',
        image: '/product-2.jpg',
        description: `
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 16px;">
            <p><strong>Loại hình:</strong> Đơn lập, Song lập</p>
            <p><strong>Diện tích đất:</strong> 205m² - 307m²</p>
          </td>
          <td style="width: 50%; vertical-align: top;">
            <p><strong>Xây dựng:</strong> 3 tầng + 1 tum</p>
            <p><strong>Công năng:</strong> Thương mại kết hợp hoặc để ở</p>
          </td>
        </tr>
      </table>
    `,
      },
      {
        id: 3,
        name: 'Dinh thự đảo',
        image: '/product-3.jpg',
        description: `
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 16px;">
            <p><strong>Diện tích đất:</strong> 567m² - 697m²</p>
            <p><strong>Diện tích sàn:</strong> 437m²</p>
          </td>
          <td style="width: 50%; vertical-align: top;">
            <p><strong>Xây dựng:</strong> 2 tầng + 1 tum</p>
            <p><strong>Công năng:</strong> Để ở</p>
          </td>
        </tr>
      </table>
    `,
      },
      {
        id: 4,
        name: 'Căn hộ SKY RETREAT',
        image: '/product-4.jpg',
        description: `
      <p><strong>Loại hình sản phẩm:</strong> Studio, 1PN-3PN, Garden Villa, Duplex, Sky Villa</p>
      <p><strong>Tiêu chuẩn bàn giao:</strong> Hoàn thiện nội thất liền tường</p>
    `,
      },
    ],
    furnitures: [
      '/furniture-1.jpg',
      '/furniture-2.jpg',
      '/furniture-3.jpg',
      '/furniture-4.jpg',
    ],
  },

  // Tiện ích
  amenity: {
    title:
      '<p style="color:#76c472;">Tiện Ích <br/><em>Không gian Retreat</em> <em style="color:#ffd4aa;">cho mọi thế hệ</em></p>',
    description: `
    <p>Giống như một <strong>“thành phố hiện đại thu nhỏ”</strong>, Eco Retreat được quy hoạch bài bản, đầy đủ tiện ích từ hệ thống trường từ mầm non đến THPT, bệnh viện & dịch vụ y tế quốc tế, khu thương mại - giải trí, trung tâm thể thao… Đặc biệt còn có Eco Bus phục vụ dành riêng cư dân Eco Retreat.</p>
    <p>Điểm nhấn nổi bật là <strong>tiện ích “retreat” đặc quyền</strong> - lần đầu tiên xuất hiện trong dự án của NSL Ecopark và khó tìm thấy ở một đô thị khác trên thị trường bất động sản phía Nam.</p>
  `,
    amenityImages: [
      '/amenities-1.jpg',
      '/amenities-2.jpg',
      '/amenities-3.jpg',
      '/amenities-4.jpg',
    ],
  },

  // Liên hệ
  contact: {
    agency: {
      agencyImage: '/contact.png',
      title: 'Đông Tây Land',
      subtitle: 'Đại lý phân phối F1 dự án Eco Retreat',
      description: `
        <p>Là doanh nghiệp uy tín và có hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản, Đông Tây Land tự hào là một trong số ít đơn vị trở thành Đại lý F1 phân phối chính thức dự án khu đô thị sinh thái Eco Retreat</p>
        <p>Nhờ đó, Quý khách hàng của Đông Tây Land dễ dàng sở hữu sản phẩm đẹp nhất, phù hợp nhu cầu nhất tại dự án mang thương hiệu danh tiếng Tập đoàn Ecopark.</p>
      `,
    },
    hotline: '1900 636 999',
    logoImage: '/logo-detail-light.png',
    backgroundImage: '/background-hero-3.png',
  },

  // Khác
  other: {
    //Chính sách
    policy: {
      title: 'Chính Sách Bán Hàng Eco Retreat',
      policyImage: '/policy.webp',
      policies: [
        '<p><span style="color: #ffd4aa;">✦</span> Thanh toán đến khi nhận nhà chỉ <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">25%</span> </p>',
        '<p><span style="color: #ffd4aa;">✦</span> Ngân hàng cho vay <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">70%</span> </p>',
        '<p><span style="color: #ffd4aa;">✦</span> Hỗ trợ lãi suất & ân hạn gốc <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">24 tháng</span></p>',
        '<p><span style="color: #ffd4aa;">✦</span> Ưu đãi thanh toán sớm <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">10%</span></p>',
        '<p><span style="color: #ffd4aa;">✦</span> Ưu đãi thanh toán theo tiến độ <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">2%</span></p>',
        '<p><span style="color: #ffd4aa;">✦</span> Ưu đãi cho KH đã sở hữu BĐS của NSL Ecopark <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">0,5%</span></p>',
      ],
    },

    // Timeline
    timeline: {
      timelineTitle:
        '<p style="color:#76c472;">Các Cột Mốc Tạo Sóng <br/><em style="color:#ffd4aa;">cho Eco Retreat</em></p>',
      timelineImage: '/time-line.png',
      progressTitle: 'Hình Ảnh Tiến Độ Dự Án',
      progressImages: [
        '/progress-1.jpg',
        '/progress-2.jpg',
        '/progress-3.jpg',
        '/progress-4.jpg',
        '/progress-5.jpg',
        '/progress-6.jpg',
        '/progress-1.jpg',
      ],
      backgroundImage: '/background-hero-1.jpg',
    },
    isFeatured: true,
    isExclusive: false,
    enableLiveSales: true,
    visibleOnWeb: true,
    breakImages: [
      '/break-1.jpg',
      '/break-2.jpg',
      '/break-3.jpg',
      '/break-4.jpg',
      '/break-5.jpg',
    ],
  },
};

/* -------------------------------------------------------------------------- */

export default function InternationalProductDetailPage() {
  /* ---------- Local state ---------- */
  const sections = useMemo(
    () => [
      {
        id: 'introduction',
        content: <Introduction data={property.introduction} />,
        label: 'Giới thiệu',
      },
      {
        content: (
          <Contact
            data={property.contact}
            products={property.production.products}
          />
        ),
      },
      {
        id: 'overview',
        content: <Overview data={property.overview} />,
        label: 'Tổng quan',
      },
      { content: <SectionBreak data={property.other.breakImages[0]} /> },
      {
        id: 'location',
        content: <Location data={property.location} />,
        label: 'Vị trí',
      },
      { content: <SectionBreak data={property.other.breakImages[1]} /> },
      {
        id: 'production',
        content: <Production data={property.production} />,
        label: 'Sản phẩm',
      },
      {
        content: (
          <Contact
            data={property.contact}
            products={property.production.products}
          />
        ),
      },
      { content: <SectionBreak data={property.other.breakImages[2]} /> },
      {
        id: 'amenity',
        content: <Amenity data={property.amenity} />,
        label: 'Tiện ích',
      },
      { content: <SectionBreak data={property.other.breakImages[3]} /> },
      {
        id: 'policy',
        content: <Policy data={property.other.policy} />,
        label: 'Chính sách',
      },
      {
        id: 'timeline',
        content: <Timeline data={property.other.timeline} />,
        label: 'Tiến độ',
      },
      { content: <SectionBreak data={property.other.breakImages[4]} /> },
      {
        id: 'agency',
        content: <Agency data={property.contact.agency} />,
        label: 'Đại lý',
      },
      {
        content: (
          <Contact
            data={property.contact}
            products={property.production.products}
          />
        ),
      },
    ],
    []
  );

  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-r from-gray-50 to-white overflow-x-clip',
        arsenal.className
      )}
    >
      <Cover data={property.introduction} />

      {/* ----------------------------------------------------------------------- */}
      {/* Header – transparent overlay                                            */}
      {/* ----------------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full bg-background py-2 shadow-md">
        <div className="mx-auto overflow-x-auto px-4 scrollbar-hide">
          <div className="flex items-center justify-between">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-24 h-14 relative center-both ml-32 cursor-pointer"
            >
              <Image
                src={property.introduction.logoImages[0]}
                alt="Eco Retreat Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <nav className="flex justify-end mr-24">
              {sections.map(
                (item) =>
                  item.label && (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="text-foreground text-base font-bold hover:bg-transparent uppercase p-2"
                      onClick={() => {
                        const section = document.getElementById(item.id);
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {item.label}
                    </Button>
                  )
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------------- */}
      {/* Conditional sections                                                    */}
      {/* ----------------------------------------------------------------------- */}
      {sections.map((section, idx) => (
        <Fragment key={section.id || idx}>{section.content}</Fragment>
      ))}
    </div>
  );
}

const SectionBreak = ({ data }: { data: string }) =>
  data && (
    <section className="relative min-h-screen center-both">
      <Image
        src={data}
        alt="Break Image"
        fill
        className="object-cover"
        priority
      />
    </section>
  );
