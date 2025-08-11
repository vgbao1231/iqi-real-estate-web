'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePartners } from '@/hooks/use-partners';
import { EditPartnerDialog } from '@/app/(admin)/admin/partners/components/edit-partner-dialog';
import { PartnersFilters } from '@/app/(admin)/admin/partners/components/partners-filters';
import { PartnersStats } from '@/app/(admin)/admin/partners/components/partners-stats';
import { PartnersTabs } from '@/app/(admin)/admin/partners/components/partners-tabs';
import { AddPartnerDialog } from '@/app/(admin)/admin/partners/components/add-partner-dialog';

export default function PartnersPage() {
  const {
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedPartner,
    handleEdit,
    currentPages,
    setCurrentPage,
    itemsPerPage,
    activeTab,
    filters,
    onFiltersChange,
  } = usePartners();

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Quản lý đối tác
          </h2>
          <p className="text-gray-600">
            Quản lý thông tin các đối tác kinh doanh bất động sản
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm đối tác
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <PartnersStats />

      {/* Filters */}
      <PartnersFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        onFiltersChange={onFiltersChange}
        activeTab={activeTab}
      />

      {/* Partners Tabs */}
      <PartnersTabs
        searchTerm={searchTerm}
        onEdit={handleEdit}
        currentPages={currentPages}
        setCurrentPage={setCurrentPage}
        filters={filters}
        itemsPerPage={itemsPerPage}
      />

      {/* Dialogs */}
      <AddPartnerDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <EditPartnerDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        partner={selectedPartner}
      />
    </div>
  );
}
