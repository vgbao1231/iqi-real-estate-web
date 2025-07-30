'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function GoogleTranslateScript() {
  useEffect(() => {
    // Ẩn UI tạm thời để tránh flash tiếng Việt
    document.documentElement.style.visibility = 'hidden';

    // Load script nếu chưa có
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Gắn callback khi Google Translate sẵn sàng
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'vi',
          includedLanguages: 'vi,en,ja,ko,zh-CN',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );

      // Sau khi dịch xong (hoặc timeout), hiện lại giao diện
      setTimeout(() => {
        document.documentElement.style.visibility = 'visible';
      }, 300); // Điều chỉnh delay nếu cần
    };
  }, []);

  return <div id="google_translate_element" className="hidden" />;
}
