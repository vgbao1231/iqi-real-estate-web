'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Nhập nội dung...',
  className,
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <div className={className}>
      <div id="editor-toolbar-container" />
      <Editor
        apiKey="xb01ma0utwqi0w8a3xlpq7rtezebz5chrc6ld13mdqxg9fip"
        onInit={(_evt: any, editor: any) => (editorRef.current = editor)}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 240,
          menubar: false,
          plugins: ['link', 'lists', 'code', 'table'],
          toolbar:
            'fontsize | forecolor backcolor | bold italic underline | lineheight indent outdent | bullist numlist | alignleft aligncenter alignright | table | undo redo',
          table_toolbar:
            'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
          font_size_formats:
            '8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 40px 48px 56px 60px',
          placeholder,
          branding: false,
          skin: 'oxide',
          content_css: 'default',
        }}
      />
    </div>
  );
}
