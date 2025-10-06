import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'IQI Vietnam - Đối tác Bất động sản Đáng tin cậy',
    template: '%s | IQI Vietnam',
  },
  description: 'IQI Vietnam cung cấp dịch vụ bất động sản toàn diện',
  keywords: ['bất động sản', 'IQI Vietnam', 'mua bán nhà', 'cho thuê căn hộ'],
  authors: [{ name: 'IQI Vietnam', url: 'https://iqiglobal.com/vn' }],
  creator: 'IQI Vietnam Team',
  openGraph: {
    title: 'IQI Vietnam - Đối tác Bất động sản Đáng tin cậy',
    description: 'IQI Vietnam cung cấp dịch vụ bất động sản toàn diện',
    url: 'https://iqiglobal.com/vn',
    siteName: 'IQI Vietnam',
    locale: 'vi_VN',
    type: 'website',
  },
};
