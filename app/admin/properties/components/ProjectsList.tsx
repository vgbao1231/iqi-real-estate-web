'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Edit, Trash2, Plus, FileText } from 'lucide-react';
import { properties } from '@/lib/property-data';

interface ProjectsListProps {
  onEditProject: (projectId: string | number | null) => void; // null for new property
}

export function ProjectsList({ onEditProject }: ProjectsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = properties.filter(
    (property) =>
      property.overview.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.overview.address
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      property.overview.developer
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý dự án Bất động sản
        </h1>
        <Button
          className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => onEditProject(null)}
        >
          <Plus className="h-4 w-4" />
          <span>Thêm dự án mới</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Danh sách dự án</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên, địa chỉ, chủ đầu tư..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên dự án</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Chủ đầu tư</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500 py-8"
                    >
                      Không tìm thấy dự án nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">
                        {property.overview.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {property.overview.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{property.overview.address}</TableCell>
                      <TableCell>{property.overview.developer}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            property.overview.status === 'Hiển thị'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-400 text-white'
                          }
                        >
                          {property.overview.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="center-both space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onEditProject(property.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
