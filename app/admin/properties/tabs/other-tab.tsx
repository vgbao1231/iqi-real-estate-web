'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, X, FileText } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { Button } from '@/components/ui/button';

interface OtherTabProps {
  other: any;
  updateProject: (section: string, field: string, value: any) => void;
  updateNestedProject: (
    section: string,
    subsection: string,
    field: string,
    value: any
  ) => void;
  addArrayItem: (section: string, field: string, item?: string) => void;
  removeArrayItem: (section: string, field: string, index: number) => void;
  updateArrayItem: (
    section: string,
    field: string,
    index: number,
    value: string
  ) => void;
  editingPolicyIndex: number | null;
  setEditingPolicyIndex: (index: number | null) => void;
}

export function OtherTab({
  other,
  updateProject,
  updateNestedProject,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
  editingPolicyIndex,
  setEditingPolicyIndex,
}: OtherTabProps) {
  return (
    <div className="space-y-6">
      {/* Policy Section */}
      <Card>
        <CardHeader>
          <CardTitle>Chính sách</CardTitle>
          <CardDescription>Cập nhật thông tin chính sách dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            label="Ảnh chính sách"
            value={other.policy.policyImage}
            onChange={(file) =>
              updateNestedProject('other', 'policy', 'policyImage', file)
            }
          />

          <div className="space-y-2">
            <Label htmlFor="policyTitle">Tiêu đề chính sách</Label>
            <Input
              id="policyTitle"
              value={other.policy.title}
              onChange={(e) =>
                updateNestedProject('other', 'policy', 'title', e.target.value)
              }
              placeholder="Nhập tiêu đề chính sách"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Danh sách chính sách</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('other', 'policy', '')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm chính sách
              </Button>
            </div>
            {other.policy.policies.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm border rounded-lg">
                {`Chưa có chính sách nào. Nhấn "Thêm chính sách" để bắt đầu.`}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {other.policy.policies.map((policy: string, index: number) => (
                  <Card key={index} className="p-3 relative">
                    {editingPolicyIndex === index ? (
                      <div className="space-y-2">
                        <RichTextEditor
                          value={policy}
                          onChange={(value) =>
                            updateArrayItem('other', 'policy', index, value)
                          }
                          placeholder="Nhập nội dung chính sách"
                          className="p-3"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingPolicyIndex(null)}
                          >
                            Hủy
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setEditingPolicyIndex(null)}
                          >
                            Lưu
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="flex-1 text-sm text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: policy }}
                        />
                        <div className="flex-shrink-0 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingPolicyIndex(index)}
                            className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeArrayItem('other', 'policy', index)
                            }
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Section */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Cập nhật thông tin timeline dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload
              label="Ảnh timeline"
              value={other.timeline.timelineImage}
              onChange={(file) =>
                updateNestedProject('other', 'timeline', 'timelineImage', file)
              }
            />
            <FileUpload
              label="Ảnh nền"
              value={other.timeline.backgroundImage}
              onChange={(file) =>
                updateNestedProject(
                  'other',
                  'timeline',
                  'backgroundImage',
                  file
                )
              }
            />
          </div>

          <MultiFileUpload
            label="Ảnh tiến độ"
            value={other.timeline.progressImages}
            onChange={(files) =>
              updateNestedProject('other', 'timeline', 'progressImages', files)
            }
          />

          <div className="space-y-2">
            <Label>Tiêu đề timeline</Label>
            <RichTextEditor
              value={other.timeline.timelineTitle}
              onChange={(value) =>
                updateNestedProject('other', 'timeline', 'timelineTitle', value)
              }
              placeholder="Nhập tiêu đề timeline"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="progressTitle">Tiêu đề tiến độ</Label>
            <Input
              id="progressTitle"
              value={other.timeline.progressTitle}
              onChange={(e) =>
                updateNestedProject(
                  'other',
                  'timeline',
                  'progressTitle',
                  e.target.value
                )
              }
              placeholder="Nhập tiêu đề tiến độ"
            />
          </div>
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt khác</CardTitle>
          <CardDescription>Cập nhật các cài đặt khác của dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <MultiFileUpload
            label="Ảnh ngắt trang"
            value={other.breakImages}
            onChange={(files) => updateProject('other', 'breakImages', files)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dự án nổi bật</Label>
                <p className="text-sm text-muted-foreground">
                  Hiển thị dự án trong danh sách nổi bật
                </p>
              </div>
              <Switch
                checked={other.isFeatured}
                onCheckedChange={(checked) =>
                  updateProject('other', 'isFeatured', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dự án độc quyền</Label>
                <p className="text-sm text-muted-foreground">
                  Đánh dấu là dự án độc quyền
                </p>
              </div>
              <Switch
                checked={other.isExclusive}
                onCheckedChange={(checked) =>
                  updateProject('other', 'isExclusive', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bán hàng trực tiếp</Label>
                <p className="text-sm text-muted-foreground">
                  Kích hoạt tính năng bán hàng trực tiếp
                </p>
              </div>
              <Switch
                checked={other.enableLiveSales}
                onCheckedChange={(checked) =>
                  updateProject('other', 'enableLiveSales', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển thị trên web</Label>
                <p className="text-sm text-muted-foreground">
                  Cho phép hiển thị dự án trên website
                </p>
              </div>
              <Switch
                checked={other.visibleOnWeb}
                onCheckedChange={(checked) =>
                  updateProject('other', 'visibleOnWeb', checked)
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {other.isFeatured && <Badge variant="secondary">Nổi bật</Badge>}
            {other.isExclusive && <Badge variant="secondary">Độc quyền</Badge>}
            {other.enableLiveSales && (
              <Badge variant="secondary">Bán hàng trực tiếp</Badge>
            )}
            {other.visibleOnWeb && (
              <Badge variant="secondary">Hiển thị web</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
