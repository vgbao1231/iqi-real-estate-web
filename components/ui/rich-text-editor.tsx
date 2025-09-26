import { useRef, useMemo, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import QuillTableBetter from 'quill-table-better';
import 'react-quill-new/dist/quill.snow.css';
import 'quill-table-better/dist/quill-table-better.css';

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
const Size: any = Quill.import('attributors/style/size');
// Thêm các giá trị pixel bạn muốn vào whitelist
Size.whitelist = FONT_SIZES;
// Đăng ký lại Size Attributor đã được tùy chỉnh
Quill.register(Size, true);

const LINE_HEIGHTS = ['1', '1.2', '1.5', '2', '2.5', '3'];
const Parchment = Quill.import('parchment');
const LineHeightStyle = new Parchment.StyleAttributor(
  'lineheight', // Tên thuộc tính sẽ dùng trong toolbar
  'line-height', // Tên thuộc tính CSS thực tế
  {
    scope: Parchment.Scope.BLOCK, // Áp dụng cho cả khối văn bản (paragraph)
    whitelist: LINE_HEIGHTS, // Chỉ cho phép các giá trị trong danh sách này
  }
);
Quill.register(LineHeightStyle, true);

Quill.register({ 'modules/table-better': QuillTableBetter }, true);

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
        bindings: QuillTableBetter.keyboardBindings,
      },
    }),
    []
  );

  useEffect(() => {
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
    const timer = setTimeout(() => {
      if (!quillRef.current) return;
      const html = initialValue.current;
      const editor = quillRef.current.getEditor();
      const delta = editor.clipboard.convert({ html });
      const [range] = editor.selection.getRange() || [];
      editor.setContents(null, Quill.sources.SILENT);
      editor.updateContents(delta, Quill.sources.SILENT);
      editor.setSelection(
        delta.length() - (range?.length || 0),
        Quill.sources.SILENT
      );
    }, 100); // hoặc 50-100ms nếu cần chắc ăn hơn

    return () => clearTimeout(timer);
  }, [quillRef]);

  return (
    <ReactQuill
      ref={quillRef}
      theme={'snow'}
      modules={modules}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};
