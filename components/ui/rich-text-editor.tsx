'use client';
import { useRef, useMemo, useEffect } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import 'quill-table-better/dist/quill-table-better.css';
import dynamic from 'next/dynamic';

interface RichTextEditorProps {
  value?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

const FONT_SIZES = [
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '28px',
  '32px',
  '36px',
  '40px',
  '44px',
];
const LINE_HEIGHTS = ['1', '1.2', '1.5', '2', '2.5', '3'];
let CachedQuill: any = null;

export const RichTextEditor = dynamic(
  async () => {
    const [{ default: RQ, Quill }, { default: QuillTableBetter }] =
      await Promise.all([
        import('react-quill-new'),
        import('quill-table-better'),
      ]);

    if (Quill) {
      const Size: any = Quill.import('attributors/style/size');
      Size.whitelist = FONT_SIZES;
      Size.default = '16px';
      Quill.register(Size, true);

      const Parchment = Quill.import('parchment');
      const LineHeightStyle = new Parchment.StyleAttributor(
        'lineheight',
        'line-height',
        { scope: Parchment.Scope.BLOCK, whitelist: LINE_HEIGHTS }
      );
      Quill.register(LineHeightStyle, true);

      Quill.register({ 'modules/table-better': QuillTableBetter }, true);
      CachedQuill = Quill;
    }

    const ReactQuillWrapper = ({
      id,
      value,
      onChange,
      placeholder = 'Nhập nội dung...',
      className,
    }: RichTextEditorProps) => {
      const modules = useMemo(
        () => ({
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
              [{ list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ size: FONT_SIZES }],
              [{ lineheight: LINE_HEIGHTS }],
              [{ color: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['table-better'],
            ],
          },
          table: false,
          'table-better': { language: 'en_US', toolbarTable: true },
        }),
        []
      );

      function injectStyle(styleId: string, css: string) {
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = css;
        document.head.appendChild(style);
      }

      useEffect(() => {
        const fontCss = FONT_SIZES.map(
          (size) => `
      .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="${size}"]::before,
      .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="${size}"]::before {
        content: '${size}';
      }
    `
        ).join('');

        injectStyle('quill-font-size-styles', fontCss);

        const lineHeightCss =
          LINE_HEIGHTS.map(
            (height) => `
      .ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="${height}"]::before,
      .ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="${height}"]::before {
        content: '${height}';
      }
    `
          ).join('') +
          `
      .ql-snow .ql-picker.ql-lineheight {
        width: 50px;
      }
      .ql-snow .ql-picker.ql-lineheight .ql-picker-label {
        padding-left: 4px;
        text-align: left;
      }
    `;

        injectStyle('quill-line-height-styles', lineHeightCss);
      }, []);

      const quillRef = useRef<any>(null);
      const initialValue = useRef(value);
      useEffect(() => {
        if (!quillRef.current) return;
        const editor = quillRef.current.getEditor();
        const html = initialValue.current;

        try {
          const delta = editor.clipboard.convert({ html });
          const [range] = editor.selection.getRange() || [];

          // SỬ DỤNG Quill.sources Ở ĐÂY
          editor.setContents(null, CachedQuill.sources.SILENT);
          editor.updateContents(delta, CachedQuill.sources.SILENT);
          editor.setSelection(
            delta.length() - (range?.length || 0),
            CachedQuill.sources.SILENT
          );
        } catch (e) {
          console.error('Lỗi khi set content Quill:', e);
        }
      }, []);

      return (
        <RQ
          ref={quillRef}
          theme="snow"
          modules={modules}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          className={className}
        />
      );
    };
    ReactQuillWrapper.displayName = 'ReactQuill';
    return ReactQuillWrapper;
  },
  { ssr: false, loading: () => <p>Đang tải trình soạn thảo...</p> }
);
