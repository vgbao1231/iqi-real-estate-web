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
    // Chặn load lại nếu đã có
    if (document.getElementById('google-translate-script')) return;

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Khởi tạo widget dịch
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'vi', // ngôn ngữ gốc của trang
          includedLanguages: 'en,vi,ja,ko', // thêm ngôn ngữ bạn muốn
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <div id="google_translate_element" className="fixed top-4 right-4 z-50" />
  );
}
