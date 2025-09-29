'use client';

import { RichTextEditor } from '@/components/ui/rich-text-editor';
import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState(
    `<table style="width: 100%" class="ql-table-better"><temporary class="ql-table-temporary" style="width: 100%" data-class="ql-table-better"><br></temporary><tbody><tr><td data-row="row-aqgq" class=""><p class="ql-table-block" data-cell="cell-0zvu">123123123123</p></td><td data-row="row-aqgq" class=""><p class="ql-table-block" data-cell="cell-0c0u">12312312312</p></td></tr><tr><td data-row="row-8gyx" class=""><p class="ql-table-block" data-cell="cell-6t88">3123123123qweqw</p></td><td data-row="row-8gyx" class="ql-cell-focused"><p class="ql-table-block" data-cell="cell-ig8z">qưeqweqweqwe</p></td></tr></tbody></table><p><br></p>`
  );

  // Render the main creation UI
  return (
    <RichTextEditor
      value={text}
      onChange={setText}
      placeholder="Nhập tiêu đề phần giới thiệu..."
    />
  );
}
