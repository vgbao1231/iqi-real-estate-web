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
          height: 300,
          menubar: false,
          plugins: ['link', 'lists', 'code'],
          toolbar: `
            bold italic underline |
            bullist numlist |
            alignleft aligncenter alignright |
            undo redo
          `,
          placeholder,
          branding: false,
          fixed_toolbar_container: '#editor-toolbar-container',
          popup_css: false,
          skin: 'oxide',
          content_css: 'default',
        }}
      />
    </div>
  );
}
