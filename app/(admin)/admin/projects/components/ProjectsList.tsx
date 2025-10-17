'use client';

import { useCallback, useState } from 'react';
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
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  FileText,
  Building2,
} from 'lucide-react';
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetAdminProjectsQuery,
} from '@/features/project/projectApi';

interface ProjectsListProps {
  onEditProject: (projectId: string | null) => void; // null for new project
}

export function ProjectsList({ onEditProject }: ProjectsListProps) {
  const { data: projects = [], isLoading } = useGetAdminProjectsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [createProject] = useCreateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const handleCreate = useCallback(async () => {
    try {
      const newProject = await createProject().unwrap();
      console.log('Created draft project:', newProject);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  }, [createProject]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteProject(id).unwrap();
        console.log('Deleted project with id:', id);
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    },
    [deleteProject]
  );

  // Modified getValue to use 'id' instead of 'key'
  const getValue = (project: any, id: string) => {
    const item = project?.overview?.basicInfo?.find((it: any) => it.id === id);
    if (!item) return '';

    const { value, options } = item;
    if (!options?.length) return value || '';

    const found = options.find((opt: any) => opt.value === value);
    return found ? found.label : value;
  };

  const filteredProjects = projects.filter((project) => {
    // nếu chưa có overview.basicInfo → vẫn cho hiển thị
    if (!project?.overview?.basicInfo) return true;

    const name = getValue(project, 'project_name')?.toLowerCase() || '';
    const address = getValue(project, 'address')?.toLowerCase() || '';
    const developer = getValue(project, 'developer')?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();

    return (
      name.includes(term) || address.includes(term) || developer.includes(term)
    );
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-4">
          <Building2 className="h-8 w-8 text-orange-600" />
          Quản lý dự án Bất động sản
        </h1>
        <Button
          className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white"
          onClick={handleCreate}
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
                  <TableHead>Loại hình</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Chủ đầu tư</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500 py-8"
                    >
                      Đang tải danh sách dự án
                    </TableCell>
                  </TableRow>
                ) : filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500 py-8"
                    >
                      Không tìm thấy dự án nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => {
                    // Use the new IDs for display
                    const name =
                      getValue(project, 'project_name') || 'Bản nháp';
                    const address =
                      getValue(project, 'address') || 'Chưa cập nhật';
                    const developer =
                      getValue(project, 'developer') || 'Chưa cập nhật';
                    const status =
                      getValue(project, 'status') || 'Chưa cập nhật';
                    const projectType =
                      getValue(project, 'project_type') || 'Chưa cập nhật';

                    return (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-center text-blue-800"
                          >
                            {projectType}
                          </Badge>
                        </TableCell>
                        <TableCell>{address}</TableCell>
                        <TableCell>{developer}</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              status === 'Đang bán' // Use your actual status string
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-400 text-white'
                            }
                          >
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-2">
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
                              onClick={() => onEditProject(project.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDelete(project.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
