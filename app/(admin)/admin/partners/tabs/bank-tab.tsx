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

interface BankTabProps {
  partners: any;
  searchTerm: string;
  onEdit: (partner: any) => void;
  onDelete: (id: any) => void;
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

export function BankTab({
  partners,
  searchTerm,
  onEdit,
  onDelete,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  filters,
}: BankTabProps) {
  const filteredAndSortedData = useMemo(() => {
    let data = partners.filter((partner: any) => {
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

      // Benefits filter (specialty field for banks)
      const matchesBenefits =
        filters.specialty.length === 0 ||
        partner.benefits.some((b: any) => filters.specialty.includes(b));

      return matchesSearch && matchesYear && matchesType && matchesBenefits;
    });

    // Sort data
    data.sort((a: any, b: any) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'loanRate':
          // Convert loan rate to number for sorting (remove %/năm)
          aValue = parseFloat(a.loanRate.replace(/[^\d.]/g, ''));
          bValue = parseFloat(b.loanRate.replace(/[^\d.]/g, ''));
          break;
        case 'maxLoan':
          // Convert max loan to number for sorting (remove %)
          aValue = parseFloat(a.maxLoan.replace(/[^\d.]/g, ''));
          bValue = parseFloat(b.maxLoan.replace(/[^\d.]/g, ''));
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
  }, [searchTerm, filters, partners]);

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
            Danh sách đối tác ngân hàng
          </CardTitle>
          <CardDescription className="text-gray-600">
            Quản lý thông tin các ngân hàng đối tác tài chính
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100">
                <TableHead className="font-medium text-gray-700">
                  Ngân hàng
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  Loại hình
                </TableHead>
                <TableHead className="font-medium text-gray-700 text-center">
                  Lãi suất
                </TableHead>
                <TableHead className="font-medium text-gray-700 text-center">
                  Tỷ lệ vay
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  Ưu đãi
                </TableHead>
                <TableHead className="font-medium text-gray-700 text-center">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((partner: any) => (
                <TableRow
                  key={partner.id}
                  className="border-gray-100 hover:bg-gray-50"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={partner.logoUrl || '/placeholder.svg'}
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
                          Từ {partner.partnershipYear}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {partner.shortDescription}
                  </TableCell>
                  <TableCell className="font-medium text-green-600 text-center">
                    {partner.loanRate}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 text-center">
                    {partner.maxLoan}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {partner.benefits
                        ?.slice(0, 2)
                        .map((benefit: any, index: any) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {benefit}
                          </Badge>
                        ))}

                      {partner.benefits && partner.benefits.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{partner.benefits.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
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
                        onClick={() => onDelete(partner.id)}
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
