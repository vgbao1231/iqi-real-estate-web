// Properties data
export const properties = [
  {
    id: 1,

    // Giới thiệu
    introduction: {
      coverImage: '/cover.jpg',
      coverTitle: 'Trải nghiệm nghỉ dưỡng giữa thiên nhiên',
      logoImages: ['/logo-retreat.png', '/logo-retreat-1.png'],

      headerLogoIndex: 0,
      coverLogoIndex: 1,
      titleImage: '/title.png',
      introductionImage: '/hero.png',
      introductionVideo: 'https://www.youtube.com/watch?v=pLL2g9_mZdo&t=94s',
      introductionBackground: '/background-hero-1.jpg',
      introductionTitle:
        '<p>Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>',
      introductionDescription: `
      <p>Xây dựng mô hình khu đô thị trên thị trường không hiếm, nhưng kiến tạo môi trường đáng sống đúng nghĩa, mang đến những giá trị đích thực thì không phải dự án nào cũng làm được.</p>
      <p>Những khu đô thị xanh của Nhà sáng lập Ecopark là ngoại lệ - nơi mọi chủ nhân đều tự hào về quyết định sở hữu và đầu tư của mình.</p>
      <p>Chào mừng Quý Anh Chị đến với Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>
      `,

      launchImages: ['/product-1.jpg', '/product-2.jpg', '/product-3.jpg'],
      launchTitle: `
          <p style="color: #ff8c3f;font-size: 32px">Chính thức ra mắt</p>
          <p style="color: #84cc16;font-size: 56px;line-height: 1;">RETREAT ISLAND</p>
          <p style="color: #84cc16;font-size: 32px">Biệt thự đảo giữa rừng retreat</p>
        `,
      launchDescription: `
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
      overviewBackground: '/background-hero-2.jpg',

      basicInfo: [
        {
          id: 'project_name',
          key: 'Tên dự án',
          value: 'Eco Retreat',
          type: 'text',
        },
        { id: 'bathrooms', key: 'Phòng tắm', value: [1, 3], type: 'range' },
        { id: 'developer', key: 'Chủ đầu tư', value: 'Ecopark', type: 'text' },
        {
          id: 'category',
          key: 'Danh mục',
          value: 'vietnam',
          type: 'select',
          options: ['vietnam', 'resort', 'international'],
          hidden: true,
        },
        {
          id: 'ownership_status',
          key: 'Tình trạng sở hữu',
          value: 'Lâu dài',
          type: 'text',
        },
        {
          id: 'property_type',
          key: 'Loại hình',
          value: 'Khu đô thị sinh thái',
          type: 'select',
          options: [
            'Căn hộ',
            'Biệt thự',
            'Nhà phố',
            'Văn phòng',
            'Khu đô thị sinh thái',
          ],
        },
        {
          id: 'legal_status',
          key: 'Tình trạng pháp lý',
          value: 'Sổ hồng sở hữu lâu dài',
          type: 'text',
        },
        {
          id: 'product_group',
          key: 'Nhóm sản phẩm',
          value: 'Căn hộ, biệt thự nghỉ dưỡng',
          type: 'text',
        },
        {
          id: 'handover_time',
          key: 'Thời gian bàn giao',
          value: 'Dự kiến Quý II/2028',
          type: 'text',
        },
        {
          id: 'landscape_designer',
          key: 'Đơn vị thiết kế cảnh quan',
          value: 'PLA Studio',
          type: 'text',
        },
        { id: 'phase', key: 'Giai đoạn', value: 'Giai đoạn 1', type: 'text' },
        {
          id: 'construction_unit',
          key: 'Đơn vị thi công',
          value: 'Coteccons, Ricons',
          type: 'text',
        },
        {
          id: 'currency_unit',
          key: 'Đơn vị tiền tệ',
          value: 'VND',
          type: 'select',
          options: ['VND', 'USD', 'EUR'],
        },
        {
          id: 'measurement_unit',
          key: 'Đơn vị đo lường',
          value: 'sqrt',
          type: 'select',
          options: ['sqm', 'sqrt'],
          hidden: true,
        },
        {
          id: 'architectural_designer',
          key: 'Đơn vị thiết kế kiến trúc',
          value:
            'Humphreys & Partners, Alpes Green Design, BNB Architects, RSA Studio, MIA Design Studio',
          type: 'text',
        },
        {
          id: 'address',
          key: 'Địa chỉ',
          value: 'Đường Nguyễn Hữu Trí, Xã Thanh Phú, Huyện Bến Lức, Long An',
          type: 'text',
        },
        {
          id: 'total_units',
          key: 'Tổng số căn/sản phẩm',
          value: 1200,
          type: 'number',
        },
        { id: 'city', key: 'Thành phố', value: 'Tỉnh Long An', type: 'text' },
        {
          id: 'land_area',
          key: 'Diện tích đất',
          value: '220.05',
          type: 'text',
        },
        {
          id: 'district',
          key: 'Quận/Huyện',
          value: 'Huyện Bến Lức',
          type: 'text',
        },
        { id: 'bedrooms', key: 'Phòng ngủ', value: [1, 4], type: 'range' },
        {
          id: 'status',
          key: 'Trạng thái',
          value: 'Đang mở bán',
          type: 'select',
          options: [
            'Đang lên kế hoạch',
            'Đang xây dựng',
            'Đang bán',
            'Đang mở bán',
            'Hoàn thành',
          ],
        },
        {
          id: 'slug',
          key: 'Slug',
          value: 'eco-retreat-ecopark',
          type: 'text',
          hidden: true,
        },
        { id: 'country', key: 'Quốc gia', value: 'Vietnam', type: 'text' },
        {
          id: 'price',
          key: 'Giá',
          value: [100000000, 300000000],
          type: 'range',
        },
      ],
      experienceImage: '/experience-overview.webp',
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
    <em><strong>Tâm điểm sinh thái - “Nhà nghỉ dưỡng” của cư dân thành phố</strong></em><br />
    Nằm nép mình bên dòng sông Bến Lức và len lỏi những dòng chảy sông, hồ uốn lượn quanh đô thị.
  </p>
`,
      mapInputType: 'coordinates',
      embedCode: '',
      locationImage: '/location.webp',
      coordinates: { lat: 10.75, lng: 106.4 },
      locationBackground: '/background-hero-2.jpg',
    },

    // Mặt bằng
    siteplan: {
      siteplanImages: ['/siteplan.jpg', '/break-1.jpg'],
      view360: [
        {
          id: 1,
          image: '/360-views/panorama.jpg',
          markers: [
            {
              id: 1,
              longitude: -0.7818,
              latitude: -0.4198,
              tooltip: 'Đi đến The Beverly 1',
              panoramaTarget: '/360-views/beverly.jpg',
            },
            {
              id: 2,
              longitude: 1.5959,
              latitude: -0.9581,
              tooltip: 'Đi đến The Beverly 2',
              panoramaTarget: '/360-views/beverly.jpg',
            },
          ],
        },
        {
          id: 2,
          image: '/360-views/beverly.jpg',
          markers: [
            {
              id: 1,
              longitude: 1.5959,
              latitude: -0.9581,
              tooltip: 'Quay lại tổng thể',
              panoramaTarget: '/360-views/panorama.jpg',
            },
          ],
        },
      ],
    },

    // Sản phẩm
    production: {
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
      furnitureImages: [
        '/furniture-1.jpg',
        '/furniture-2.jpg',
        '/furniture-3.jpg',
        '/furniture-4.jpg',
      ],
    },

    // Tiện ích
    amenity: {
      title:
        '<p style="color:#76c472;font-size: 48px;line-height: 1.2; font-weight: bold">Tiện Ích <br/><em>Không gian Retreat</em> <em style="color:#ffd4aa;">cho mọi thế hệ</em></p>',
      description: `
    <p style="font-size: 18px;">Giống như một <strong>“thành phố hiện đại thu nhỏ”</strong>, Eco Retreat được quy hoạch bài bản, đầy đủ tiện ích từ hệ thống trường từ mầm non đến THPT, bệnh viện & dịch vụ y tế quốc tế, khu thương mại - giải trí, trung tâm thể thao… Đặc biệt còn có Eco Bus phục vụ dành riêng cư dân Eco Retreat.</p>
    <p style="font-size: 18px;">Điểm nhấn nổi bật là <strong>tiện ích “retreat” đặc quyền</strong> - lần đầu tiên xuất hiện trong dự án của NSL Ecopark và khó tìm thấy ở một đô thị khác trên thị trường bất động sản phía Nam.</p>
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
      layoutId: 'layout-4', // Add this field
      logoImage: '/logo-detail-light.png',
      contactBackground: '/background-hero-3.png',
    },

    // Khác
    other: {
      //Chính sách
      policy: {
        title: 'Chính Sách Bán Hàng Eco Retreat',
        policyImage: '/policy.webp',
        policyText: `<p><span style="color: #ffd4aa;">✦</span> Thanh toán đến khi nhận nhà chỉ <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">25%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ngân hàng cho vay <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">70%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Hỗ trợ lãi suất & ân hạn gốc <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">24 tháng</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi thanh toán sớm <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">10%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi thanh toán theo tiến độ <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">2%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi cho KH đã sở hữu BĐS của NSL Ecopark <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">0,5%</span></p>
`,
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

      // Đại lý
      agency: {
        title: 'Thông Tin Đại Lý',
        agencyImage: '/contact.png',
        description: `<p>IQI Vietnam - thành viên của tập đoàn quốc tế IQI Global, là một trong những đơn vị phân phối bất động sản hàng đầu hiện nay. Với đội ngũ chuyên gia giàu kinh nghiệm và mạng lưới hoạt động rộng khắp, IQI Vietnam vinh dự trở thành Đại lý F1 chính thức phân phối dự án khu đô thị sinh thái Eco Retreat tại Ecopark.</p>
        <p>Việc hợp tác chiến lược này sẽ giúp khách hàng tiếp cận dễ dàng hơn với những sản phẩm đẳng cấp, pháp lý minh bạch và tiềm năng gia tăng giá trị bền vững. Đồng thời, IQI Vietnam cam kết mang đến dịch vụ tư vấn chuyên nghiệp, tận tâm nhằm đáp ứng tốt nhất nhu cầu đầu tư và an cư của Quý khách hàng.</p>
        `,
      },
      isFeatured: true,
      isExclusive: false,
      enableLiveSales: true,
      visibleOnWeb: true,
      breakImages: [
        '/break-1.jpg',
        '',
        '/break-2.jpg',
        '',
        '/break-3.jpg',
        '',
        '/break-4.jpg',
        '/break-5.jpg',
      ],
    },
  },
  {
    id: 2,

    // Giới thiệu
    introduction: {
      coverImage: '/cover.jpg',
      coverTitle: 'Trải nghiệm nghỉ dưỡng giữa thiên nhiên',
      logoImages: ['/logo-retreat.png', '/logo-retreat-1.png'],

      headerLogoIndex: 0,
      coverLogoIndex: 1,
      titleImage: '/title.png',
      introductionImage: '/hero.png',
      introductionVideo: 'https://www.youtube.com/watch?v=pLL2g9_mZdo&t=94s',
      introductionBackground: '/background-hero-1.jpg',
      introductionTitle:
        '<p>Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>',
      introductionDescription: `
      <p>Xây dựng mô hình khu đô thị trên thị trường không hiếm, nhưng kiến tạo môi trường đáng sống đúng nghĩa, mang đến những giá trị đích thực thì không phải dự án nào cũng làm được.</p>
      <p>Những khu đô thị xanh của Nhà sáng lập Ecopark là ngoại lệ - nơi mọi chủ nhân đều tự hào về quyết định sở hữu và đầu tư của mình.</p>
      <p>Chào mừng Quý Anh Chị đến với Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>
      `,

      launchImages: ['/product-1.jpg', '/product-2.jpg', '/product-3.jpg'],
      launchTitle: `
          <p style="color: #ff8c3f;font-size: 32px">Chính thức ra mắt</p>
          <p style="color: #84cc16;font-size: 56px;line-height: 1;">RETREAT ISLAND</p>
          <p style="color: #84cc16;font-size: 32px">Biệt thự đảo giữa rừng retreat</p>
        `,
      launchDescription: `
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
      overviewBackground: '/background-hero-2.jpg',

      basicInfo: [
        {
          id: 'project_name',
          key: 'Tên dự án',
          value: 'Eco Retreat',
          type: 'text',
        },
        { id: 'bathrooms', key: 'Phòng tắm', value: [1, 3], type: 'range' },
        { id: 'developer', key: 'Chủ đầu tư', value: 'Ecopark', type: 'text' },
        {
          id: 'category',
          key: 'Danh mục',
          value: 'vietnam',
          type: 'select',
          options: ['vietnam', 'resort', 'international'],
          hidden: true,
        },
        {
          id: 'ownership_status',
          key: 'Tình trạng sở hữu',
          value: 'Lâu dài',
          type: 'text',
        },
        {
          id: 'property_type',
          key: 'Loại hình',
          value: 'Khu đô thị sinh thái',
          type: 'select',
          options: [
            'Căn hộ',
            'Biệt thự',
            'Nhà phố',
            'Văn phòng',
            'Khu đô thị sinh thái',
          ],
        },
        {
          id: 'legal_status',
          key: 'Tình trạng pháp lý',
          value: 'Sổ hồng sở hữu lâu dài',
          type: 'text',
        },
        {
          id: 'product_group',
          key: 'Nhóm sản phẩm',
          value: 'Căn hộ, biệt thự nghỉ dưỡng',
          type: 'text',
        },
        {
          id: 'handover_time',
          key: 'Thời gian bàn giao',
          value: 'Dự kiến Quý II/2028',
          type: 'text',
        },
        {
          id: 'landscape_designer',
          key: 'Đơn vị thiết kế cảnh quan',
          value: 'PLA Studio',
          type: 'text',
        },
        { id: 'phase', key: 'Giai đoạn', value: 'Giai đoạn 1', type: 'text' },
        {
          id: 'construction_unit',
          key: 'Đơn vị thi công',
          value: 'Coteccons, Ricons',
          type: 'text',
        },
        {
          id: 'currency_unit',
          key: 'Đơn vị tiền tệ',
          value: 'VND',
          type: 'select',
          options: ['VND', 'USD', 'EUR'],
        },
        {
          id: 'measurement_unit',
          key: 'Đơn vị đo lường',
          value: 'sqrt',
          type: 'select',
          options: ['sqm', 'sqrt'],
          hidden: true,
        },
        {
          id: 'architectural_designer',
          key: 'Đơn vị thiết kế kiến trúc',
          value:
            'Humphreys & Partners, Alpes Green Design, BNB Architects, RSA Studio, MIA Design Studio',
          type: 'text',
        },
        {
          id: 'address',
          key: 'Địa chỉ',
          value: 'Đường Nguyễn Hữu Trí, Xã Thanh Phú, Huyện Bến Lức, Long An',
          type: 'text',
        },
        {
          id: 'total_units',
          key: 'Tổng số căn/sản phẩm',
          value: 1200,
          type: 'number',
        },
        { id: 'city', key: 'Thành phố', value: 'Tỉnh Long An', type: 'text' },
        {
          id: 'land_area',
          key: 'Diện tích đất',
          value: '220.05',
          type: 'text',
        },
        {
          id: 'district',
          key: 'Quận/Huyện',
          value: 'Huyện Bến Lức',
          type: 'text',
        },
        { id: 'bedrooms', key: 'Phòng ngủ', value: [1, 4], type: 'range' },
        {
          id: 'status',
          key: 'Trạng thái',
          value: 'Đang mở bán',
          type: 'select',
          options: [
            'Đang lên kế hoạch',
            'Đang xây dựng',
            'Đang bán',
            'Đang mở bán',
            'Hoàn thành',
          ],
        },
        {
          id: 'slug',
          key: 'Slug',
          value: 'eco-retreat-ecopark',
          type: 'text',
          hidden: true,
        },
        { id: 'country', key: 'Quốc gia', value: 'Vietnam', type: 'text' },
        {
          id: 'price',
          key: 'Giá',
          value: [100000000, 300000000],
          type: 'range',
        },
      ],
      experienceImage: '/experience-overview.webp',
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
    <em><strong>Tâm điểm sinh thái - “Nhà nghỉ dưỡng” của cư dân thành phố</strong></em><br />
    Nằm nép mình bên dòng sông Bến Lức và len lỏi những dòng chảy sông, hồ uốn lượn quanh đô thị.
  </p>
`,
      mapInputType: 'coordinates',
      embedCode: '',
      locationImage: '/location.webp',
      coordinates: { lat: 10.75, lng: 106.4 },
      locationBackground: '/background-hero-2.jpg',
    },

    // Mặt bằng
    siteplan: {
      siteplanImages: ['/siteplan.jpg', '/break-1.jpg'],
      view360: [
        {
          id: 1,
          image: '/360-views/panorama.jpg',
          markers: [
            {
              id: 1,
              longitude: -0.7818,
              latitude: -0.4198,
              tooltip: 'Đi đến The Beverly 1',
              panoramaTarget: '/360-views/beverly.jpg',
            },
            {
              id: 2,
              longitude: 1.5959,
              latitude: -0.9581,
              tooltip: 'Đi đến The Beverly 2',
              panoramaTarget: '/360-views/beverly.jpg',
            },
          ],
        },
        {
          id: 2,
          image: '/360-views/beverly.jpg',
          markers: [
            {
              id: 1,
              longitude: 1.5959,
              latitude: -0.9581,
              tooltip: 'Quay lại tổng thể',
              panoramaTarget: '/360-views/panorama.jpg',
            },
          ],
        },
      ],
    },

    // Sản phẩm
    production: {
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
      furnitureImages: [
        '/furniture-1.jpg',
        '/furniture-2.jpg',
        '/furniture-3.jpg',
        '/furniture-4.jpg',
      ],
    },

    // Tiện ích
    amenity: {
      title:
        '<p style="color:#76c472;font-size: 48px;line-height: 1.2; font-weight: bold">Tiện Ích <br/><em>Không gian Retreat</em> <em style="color:#ffd4aa;">cho mọi thế hệ</em></p>',
      description: `
    <p style="font-size: 18px;">Giống như một <strong>“thành phố hiện đại thu nhỏ”</strong>, Eco Retreat được quy hoạch bài bản, đầy đủ tiện ích từ hệ thống trường từ mầm non đến THPT, bệnh viện & dịch vụ y tế quốc tế, khu thương mại - giải trí, trung tâm thể thao… Đặc biệt còn có Eco Bus phục vụ dành riêng cư dân Eco Retreat.</p>
    <p style="font-size: 18px;">Điểm nhấn nổi bật là <strong>tiện ích “retreat” đặc quyền</strong> - lần đầu tiên xuất hiện trong dự án của NSL Ecopark và khó tìm thấy ở một đô thị khác trên thị trường bất động sản phía Nam.</p>
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
      layoutId: 'layout-4', // Add this field
      logoImage: '/logo-detail-light.png',
      contactBackground: '/background-hero-3.png',
    },

    // Khác
    other: {
      //Chính sách
      policy: {
        title: 'Chính Sách Bán Hàng Eco Retreat',
        policyImage: '/policy.webp',
        policyText: `<p><span style="color: #ffd4aa;">✦</span> Thanh toán đến khi nhận nhà chỉ <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">25%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ngân hàng cho vay <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">70%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Hỗ trợ lãi suất & ân hạn gốc <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">24 tháng</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi thanh toán sớm <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">10%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi thanh toán theo tiến độ <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">2%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi cho KH đã sở hữu BĐS của NSL Ecopark <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">0,5%</span></p>
`,
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

      // Đại lý
      agency: {
        title: 'Thông Tin Đại Lý',
        agencyImage: '/contact.png',
        description: `<p>IQI Vietnam - thành viên của tập đoàn quốc tế IQI Global, là một trong những đơn vị phân phối bất động sản hàng đầu hiện nay. Với đội ngũ chuyên gia giàu kinh nghiệm và mạng lưới hoạt động rộng khắp, IQI Vietnam vinh dự trở thành Đại lý F1 chính thức phân phối dự án khu đô thị sinh thái Eco Retreat tại Ecopark.</p>
        <p>Việc hợp tác chiến lược này sẽ giúp khách hàng tiếp cận dễ dàng hơn với những sản phẩm đẳng cấp, pháp lý minh bạch và tiềm năng gia tăng giá trị bền vững. Đồng thời, IQI Vietnam cam kết mang đến dịch vụ tư vấn chuyên nghiệp, tận tâm nhằm đáp ứng tốt nhất nhu cầu đầu tư và an cư của Quý khách hàng.</p>
        `,
      },
      isFeatured: true,
      isExclusive: false,
      enableLiveSales: true,
      visibleOnWeb: true,
      breakImages: [
        '/break-1.jpg',
        '',
        '/break-2.jpg',
        '',
        '/break-3.jpg',
        '',
        '/break-4.jpg',
        '/break-5.jpg',
      ],
    },
  },
  {
    id: 3,

    // Giới thiệu
    introduction: {
      coverImage: '/cover.jpg',
      coverTitle: 'Trải nghiệm nghỉ dưỡng giữa thiên nhiên',
      logoImages: ['/logo-retreat.png', '/logo-retreat-1.png'],

      headerLogoIndex: 0,
      coverLogoIndex: 1,
      titleImage: '/title.png',
      introductionImage: '/hero.png',
      introductionVideo: 'https://www.youtube.com/watch?v=pLL2g9_mZdo&t=94s',
      introductionBackground: '/background-hero-1.jpg',
      introductionTitle:
        '<p>Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>',
      introductionDescription: `
      <p>Xây dựng mô hình khu đô thị trên thị trường không hiếm, nhưng kiến tạo môi trường đáng sống đúng nghĩa, mang đến những giá trị đích thực thì không phải dự án nào cũng làm được.</p>
      <p>Những khu đô thị xanh của Nhà sáng lập Ecopark là ngoại lệ - nơi mọi chủ nhân đều tự hào về quyết định sở hữu và đầu tư của mình.</p>
      <p>Chào mừng Quý Anh Chị đến với Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>
      `,

      launchImages: ['/product-1.jpg', '/product-2.jpg', '/product-3.jpg'],
      launchTitle: `
          <p style="color: #ff8c3f;font-size: 32px">Chính thức ra mắt</p>
          <p style="color: #84cc16;font-size: 56px;line-height: 1;">RETREAT ISLAND</p>
          <p style="color: #84cc16;font-size: 32px">Biệt thự đảo giữa rừng retreat</p>
        `,
      launchDescription: `
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
      overviewBackground: '/background-hero-2.jpg',

      basicInfo: [
        {
          id: 'project_name',
          key: 'Tên dự án',
          value: 'Eco Retreat',
          type: 'text',
        },
        { id: 'bathrooms', key: 'Phòng tắm', value: [1, 3], type: 'range' },
        { id: 'developer', key: 'Chủ đầu tư', value: 'Ecopark', type: 'text' },
        {
          id: 'category',
          key: 'Danh mục',
          value: 'vietnam',
          type: 'select',
          options: ['vietnam', 'resort', 'international'],
          hidden: true,
        },
        {
          id: 'ownership_status',
          key: 'Tình trạng sở hữu',
          value: 'Lâu dài',
          type: 'text',
        },
        {
          id: 'property_type',
          key: 'Loại hình',
          value: 'Khu đô thị sinh thái',
          type: 'select',
          options: [
            'Căn hộ',
            'Biệt thự',
            'Nhà phố',
            'Văn phòng',
            'Khu đô thị sinh thái',
          ],
        },
        {
          id: 'legal_status',
          key: 'Tình trạng pháp lý',
          value: 'Sổ hồng sở hữu lâu dài',
          type: 'text',
        },
        {
          id: 'product_group',
          key: 'Nhóm sản phẩm',
          value: 'Căn hộ, biệt thự nghỉ dưỡng',
          type: 'text',
        },
        {
          id: 'handover_time',
          key: 'Thời gian bàn giao',
          value: 'Dự kiến Quý II/2028',
          type: 'text',
        },
        {
          id: 'landscape_designer',
          key: 'Đơn vị thiết kế cảnh quan',
          value: 'PLA Studio',
          type: 'text',
        },
        { id: 'phase', key: 'Giai đoạn', value: 'Giai đoạn 1', type: 'text' },
        {
          id: 'construction_unit',
          key: 'Đơn vị thi công',
          value: 'Coteccons, Ricons',
          type: 'text',
        },
        {
          id: 'currency_unit',
          key: 'Đơn vị tiền tệ',
          value: 'VND',
          type: 'select',
          options: ['VND', 'USD', 'EUR'],
        },
        {
          id: 'measurement_unit',
          key: 'Đơn vị đo lường',
          value: 'sqrt',
          type: 'select',
          options: ['sqm', 'sqrt'],
          hidden: true,
        },
        {
          id: 'architectural_designer',
          key: 'Đơn vị thiết kế kiến trúc',
          value:
            'Humphreys & Partners, Alpes Green Design, BNB Architects, RSA Studio, MIA Design Studio',
          type: 'text',
        },
        {
          id: 'address',
          key: 'Địa chỉ',
          value: 'Đường Nguyễn Hữu Trí, Xã Thanh Phú, Huyện Bến Lức, Long An',
          type: 'text',
        },
        {
          id: 'total_units',
          key: 'Tổng số căn/sản phẩm',
          value: 1200,
          type: 'number',
        },
        { id: 'city', key: 'Thành phố', value: 'Tỉnh Long An', type: 'text' },
        {
          id: 'land_area',
          key: 'Diện tích đất',
          value: '220.05',
          type: 'text',
        },
        {
          id: 'district',
          key: 'Quận/Huyện',
          value: 'Huyện Bến Lức',
          type: 'text',
        },
        { id: 'bedrooms', key: 'Phòng ngủ', value: [1, 4], type: 'range' },
        {
          id: 'status',
          key: 'Trạng thái',
          value: 'Đang mở bán',
          type: 'select',
          options: [
            'Đang lên kế hoạch',
            'Đang xây dựng',
            'Đang bán',
            'Đang mở bán',
            'Hoàn thành',
          ],
        },
        {
          id: 'slug',
          key: 'Slug',
          value: 'eco-retreat-ecopark',
          type: 'text',
          hidden: true,
        },
        { id: 'country', key: 'Quốc gia', value: 'Vietnam', type: 'text' },
        {
          id: 'price',
          key: 'Giá',
          value: [100000000, 300000000],
          type: 'range',
        },
      ],
      experienceImage: '/experience-overview.webp',
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
    <em><strong>Tâm điểm sinh thái - “Nhà nghỉ dưỡng” của cư dân thành phố</strong></em><br />
    Nằm nép mình bên dòng sông Bến Lức và len lỏi những dòng chảy sông, hồ uốn lượn quanh đô thị.
  </p>
`,
      mapInputType: 'coordinates',
      embedCode: '',
      locationImage: '/location.webp',
      coordinates: { lat: 10.75, lng: 106.4 },
      locationBackground: '/background-hero-2.jpg',
    },

    // Mặt bằng
    siteplan: {
      siteplanImages: ['/siteplan.jpg', '/break-1.jpg'],
      view360: [
        {
          id: 1,
          image: '/360-views/panorama.jpg',
          markers: [
            {
              id: 1,
              longitude: -0.7818,
              latitude: -0.4198,
              tooltip: 'Đi đến The Beverly 1',
              panoramaTarget: '/360-views/beverly.jpg',
            },
            {
              id: 2,
              longitude: 1.5959,
              latitude: -0.9581,
              tooltip: 'Đi đến The Beverly 2',
              panoramaTarget: '/360-views/beverly.jpg',
            },
          ],
        },
        {
          id: 2,
          image: '/360-views/beverly.jpg',
          markers: [
            {
              id: 1,
              longitude: 1.5959,
              latitude: -0.9581,
              tooltip: 'Quay lại tổng thể',
              panoramaTarget: '/360-views/panorama.jpg',
            },
          ],
        },
      ],
    },

    // Sản phẩm
    production: {
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
      furnitureImages: [
        '/furniture-1.jpg',
        '/furniture-2.jpg',
        '/furniture-3.jpg',
        '/furniture-4.jpg',
      ],
    },

    // Tiện ích
    amenity: {
      title:
        '<p style="color:#76c472;font-size: 48px;line-height: 1.2; font-weight: bold">Tiện Ích <br/><em>Không gian Retreat</em> <em style="color:#ffd4aa;">cho mọi thế hệ</em></p>',
      description: `
    <p style="font-size: 18px;">Giống như một <strong>“thành phố hiện đại thu nhỏ”</strong>, Eco Retreat được quy hoạch bài bản, đầy đủ tiện ích từ hệ thống trường từ mầm non đến THPT, bệnh viện & dịch vụ y tế quốc tế, khu thương mại - giải trí, trung tâm thể thao… Đặc biệt còn có Eco Bus phục vụ dành riêng cư dân Eco Retreat.</p>
    <p style="font-size: 18px;">Điểm nhấn nổi bật là <strong>tiện ích “retreat” đặc quyền</strong> - lần đầu tiên xuất hiện trong dự án của NSL Ecopark và khó tìm thấy ở một đô thị khác trên thị trường bất động sản phía Nam.</p>
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
      layoutId: 'layout-4', // Add this field
      logoImage: '/logo-detail-light.png',
      contactBackground: '/background-hero-3.png',
    },

    // Khác
    other: {
      //Chính sách
      policy: {
        title: 'Chính Sách Bán Hàng Eco Retreat',
        policyImage: '/policy.webp',
        policyText: `<p><span style="color: #ffd4aa;">✦</span> Thanh toán đến khi nhận nhà chỉ <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">25%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ngân hàng cho vay <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">70%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Hỗ trợ lãi suất & ân hạn gốc <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">24 tháng</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi thanh toán sớm <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">10%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi thanh toán theo tiến độ <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">2%</span></p>
<p><span style="color: #ffd4aa;">✦</span> Ưu đãi cho KH đã sở hữu BĐS của NSL Ecopark <span style="color: #76c472;font-weight: bold; font-style: italic; font-size: 30px;">0,5%</span></p>
`,
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

      // Đại lý
      agency: {
        title: 'Thông Tin Đại Lý',
        agencyImage: '/contact.png',
        description: `<p>IQI Vietnam - thành viên của tập đoàn quốc tế IQI Global, là một trong những đơn vị phân phối bất động sản hàng đầu hiện nay. Với đội ngũ chuyên gia giàu kinh nghiệm và mạng lưới hoạt động rộng khắp, IQI Vietnam vinh dự trở thành Đại lý F1 chính thức phân phối dự án khu đô thị sinh thái Eco Retreat tại Ecopark.</p>
        <p>Việc hợp tác chiến lược này sẽ giúp khách hàng tiếp cận dễ dàng hơn với những sản phẩm đẳng cấp, pháp lý minh bạch và tiềm năng gia tăng giá trị bền vững. Đồng thời, IQI Vietnam cam kết mang đến dịch vụ tư vấn chuyên nghiệp, tận tâm nhằm đáp ứng tốt nhất nhu cầu đầu tư và an cư của Quý khách hàng.</p>
        `,
      },
      isFeatured: true,
      isExclusive: false,
      enableLiveSales: true,
      visibleOnWeb: true,
      breakImages: [
        '/break-1.jpg',
        '',
        '/break-2.jpg',
        '',
        '/break-3.jpg',
        '',
        '/break-4.jpg',
        '/break-5.jpg',
      ],
    },
  },
];

export const bedroomOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: '1', label: '1 phòng' },
  { value: '2', label: '2 phòng' },
  { value: '3', label: '3 phòng' },
  { value: '4+', label: '4+ phòng' },
];

export const bathroomOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: '1', label: '1 phòng' },
  { value: '2', label: '2 phòng' },
  { value: '3', label: '3 phòng' },
  { value: '4+', label: '4+ phòng' },
];

export const propertyTypes = [
  { value: 'all', label: 'Tất cả loại hình' },
  { value: 'apartment', label: 'Căn hộ' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Nhà phố' },
  { value: 'office', label: 'Văn phòng' },
];

export const categoryTypes = [
  { value: 'all', label: 'Tất cả loại hình' },
  { value: 'vietnam', label: 'Việt Nam' },
  { value: 'international', label: 'Quốc tế' },
  { value: 'resort', label: 'Nghỉ dưỡng' },
];

export const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'selling', label: 'Đang bán' },
  { value: 'ready', label: 'Sẵn sàng' },
  { value: 'upcoming', label: 'Sắp mở bán' },
  { value: 'handover', label: 'Sắp bàn giao' },
];
