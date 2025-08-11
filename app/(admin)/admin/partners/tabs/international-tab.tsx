import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Edit, Trash2 } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import Image from 'next/image';
import { partners } from '@/lib/partner-data';

interface InternationalTabProps {
  searchTerm: string;
  onEdit: (partner: any) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  filters: {
    partnershipYear: string[];
    partnerType: string[];
    specialty: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
}

export function InternationalTab({
  searchTerm,
  onEdit,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  filters,
}: InternationalTabProps) {
  const filteredAndSortedData = useMemo(() => {
    let data = partners.international.filter((partner) => {
      // Search filter
      const matchesSearch =
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.type.toLowerCase().includes(searchTerm.toLowerCase());

      // Year filter
      const matchesYear =
        filters.partnershipYear.length === 0 ||
        filters.partnershipYear.includes(partner.partnership);

      // Type filter
      const matchesType =
        filters.partnerType.length === 0 ||
        filters.partnerType.includes(partner.type);

      // Specialty filter
      const matchesSpecialty =
        filters.specialty.length === 0 ||
        (partner.specialties &&
          partner.specialties.some((s) => filters.specialty.includes(s)));

      return matchesSearch && matchesYear && matchesType && matchesSpecialty;
    });

    // Sort data
    data.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'countries':
          aValue = a.countries;
          bValue = b.countries;
          break;
        case 'agents':
          // Convert agents to number for sorting (remove + and , characters)
          aValue = parseInt(a.agents.replace(/[^\d]/g, ''));
          bValue = parseInt(b.agents.replace(/[^\d]/g, ''));
          break;
        case 'partnership':
          aValue = parseInt(a.partnership);
          bValue = parseInt(b.partnership);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Danh sách đối tác quốc tế
          </CardTitle>
          <CardDescription className="text-gray-600">
            Quản lý thông tin các đối tác đầu tư quốc tế
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100">
                <TableHead className="font-medium text-gray-700">
                  Đối tác
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  Loại hình
                </TableHead>
                <TableHead className="font-medium text-gray-700 text-center">
                  Quốc gia
                </TableHead>
                <TableHead className="font-medium text-gray-700 text-center">
                  Đại lý
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  Chuyên môn
                </TableHead>
                <TableHead className="font-medium text-gray-700 text-center">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((partner) => (
                <TableRow
                  key={partner.id}
                  className="border-gray-100 hover:bg-gray-50"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={partner.logo || '/placeholder.svg'}
                        alt={partner.name}
                        width={80}
                        height={80}
                        className="aspect-[4/3] object-contain"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {partner.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Từ {partner.partnership}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {partner.type}
                  </TableCell>
                  <TableCell className="text-gray-600 text-center">
                    {partner.countries}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 text-center">
                    {partner.agents}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {partner.specialties
                        ?.slice(0, 2)
                        .map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      {partner.specialties &&
                        partner.specialties.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{partner.specialties.length - 2}
                          </Badge>
                        )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="center-both space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => onEdit(partner)}
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredAndSortedData.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
