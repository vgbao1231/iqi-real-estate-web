'use client';
import { useRef, useMemo, useEffect } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import 'quill-table-better/dist/quill-table-better.css';
import dynamic from 'next/dynamic';

const FONT_SIZES = [
  '12px',
  '14px',
  '16px',
  '18px',
  '24px',
  '32px',
  '36px',
  '40px',
  '44px',
];
const LINE_HEIGHTS = ['1', '1.2', '1.5', '2', '2.5', '3'];

const ReactQuill = dynamic(
  async () => {
    // 1. IMPORT CÁC THƯ VIỆN CHỈ DÙNG TRÊN CLIENT
    const [
      { default: RQ, Quill }, // Lấy default export (RQ) và named export (Quill)
      { default: QuillTableBetter },
    ] = await Promise.all([
      import('react-quill-new'),
      import('quill-table-better'),
    ]);

    // 2. ĐĂNG KÝ CÁC MODULE VÀ ATTRIBUTOR CỦA QUILL TRONG ĐÂY
    // Logic này chỉ chạy 1 lần trên client khi component được tải
    if (Quill) {
      // Đăng ký Font Size Attributor
      const Size: any = Quill.import('attributors/style/size');
      Size.whitelist = FONT_SIZES;
      Quill.register(Size, true);

      // Đăng ký Line Height Attributor
      const Parchment = Quill.import('parchment');
      const LineHeightStyle = new Parchment.StyleAttributor(
        'lineheight',
        'line-height',
        {
          scope: Parchment.Scope.BLOCK,
          whitelist: LINE_HEIGHTS,
        }
      );
      Quill.register(LineHeightStyle, true);

      // Đăng ký Module Bảng (Table Better)
      Quill.register({ 'modules/table-better': QuillTableBetter }, true);
    }

    // 3. WRAPPER COMPONENT TRẢ VỀ
    const ReactQuillWrapper = ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );

    ReactQuillWrapper.displayName = 'ReactQuill';

    return ReactQuillWrapper;
  },
  {
    // BẮT BUỘC ssr: false vì Quill chỉ chạy trên Browser
    ssr: false,
    loading: () => <p>Đang tải trình soạn thảo...</p>, // Thêm loading indicator
  }
);

interface RichTextEditorProps {
  value?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Nhập nội dung...',
  className,
}: RichTextEditorProps) => {
  const quillRef = useRef<any>(null);
  const initialValue = useRef(value);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          [{ list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ size: FONT_SIZES }],
          [{ lineheight: LINE_HEIGHTS }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ['table-better'], // Add table tool
        ],
      },
      table: false,
      'table-better': {
        language: 'en_US',
        // menus: [
        //   'column',
        //   'row',
        //   'merge',
        //   'table',
        //   'cell',
        //   'wrap',
        //   'copy',
        //   'delete',
        // ],
        toolbarTable: true,
      },
      keyboard: {
        bindings:
          typeof window !== 'undefined' && quillRef.current?.getEditor()
            ? quillRef.current.getEditor().getModule('keyboard').bindings
            : {},
      },
    }),
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const styleId = 'quill-font-size-styles';
    // Chỉ tạo thẻ style nếu nó chưa tồn tại
    if (document.getElementById(styleId)) {
      return;
    }

    // Tạo chuỗi CSS từ mảng FONT_SIZES
    const css = FONT_SIZES.map(
      (size) => `
      .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="${size}"]::before,
      .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="${size}"]::before {
        content: '${size}';
      }
    `
    ).join('');

    // Tạo thẻ <style> và chèn vào <head> của trang
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = css;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const styleId = 'quill-line-height-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    // --- BẮT ĐẦU PHẦN CẬP NHẬT ---

    // CSS để tạo nhãn cho các tùy chọn trong dropdown (giữ nguyên)
    const labelCss = LINE_HEIGHTS.map(
      (height) => `
      .ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="${height}"]::before,
      .ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="${height}"]::before {
        content: '${height}';
      }
    `
    ).join('');

    // CSS để sửa lỗi UI (phần thêm mới)
    const layoutCss = `
      .ql-snow .ql-picker.ql-lineheight {
        width: 50px; /* Tăng chiều rộng của dropdown */
      }

      .ql-snow .ql-picker.ql-lineheight .ql-picker-label {
        padding-left: 4px; /* Thêm khoảng trống bên trái */
        text-align: left; /* Căn lề trái cho text */
      }
    `;

    // Gộp 2 phần CSS lại
    const finalCss = labelCss + layoutCss;

    // --- KẾT THÚC PHẦN CẬP NHẬT ---

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = finalCss; // Sử dụng CSS đã gộp
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      if (!quillRef.current) return;
      const html = initialValue.current;
      const editor = quillRef.current.getEditor();

      // VÌ BẠN ĐÃ XÓA IMPORT STATIC { Quill }
      // BẠN PHẢI TẢI LẠI ĐỐI TƯỢNG Quill ĐỂ CÓ THỂ DÙNG Quill.sources.SILENT

      // Nếu không có HTML ban đầu, chỉ cần return để tránh lỗi
      if (!html) return;

      // Dùng Dynamic Import cho Quill để truy cập Quill.sources
      import('react-quill-new')
        .then(({ Quill }) => {
          if (!Quill) return; // Kiểm tra an toàn

          const delta = editor.clipboard.convert({ html });
          const [range] = editor.selection.getRange() || [];

          // SỬ DỤNG Quill.sources Ở ĐÂY
          editor.setContents(null, Quill.sources.SILENT);
          editor.updateContents(delta, Quill.sources.SILENT);
          editor.setSelection(
            delta.length() - (range?.length || 0),
            Quill.sources.SILENT
          );
        })
        .catch((err) => {
          console.error('Lỗi khi tải Quill để setContents:', err);
        });
    }, 100);

    return () => clearTimeout(timer);
  }, [quillRef]);

  return (
    <ReactQuill
      forwardedRef={quillRef}
      theme={'snow'}
      modules={modules}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};
