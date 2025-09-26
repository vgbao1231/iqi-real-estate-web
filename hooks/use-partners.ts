'use client';

import { useState } from 'react';

export function usePartners() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [activeTab, setActiveTab] = useState('developer');

  // Separate pagination state for each tab
  const [currentPages, setCurrentPages] = useState({
    developer: 1,
    international: 1,
    bank: 1,
  });

  // Filter state
  const [filters, setFilters] = useState({
    partnershipYear: [] as string[],
    partnerType: [] as string[],
    specialty: [] as string[],
    sortBy: 'name',
    sortOrder: 'asc' as 'asc' | 'desc',
  });

  const itemsPerPage = 5;

  const handleEdit = (partner: any) => {
    setSelectedPartner(partner);
    setIsDialogOpen(true);
  };

  const setCurrentPage = (
    tab: 'developer' | 'international' | 'bank',
    page: number
  ) => {
    setCurrentPages((prev) => ({
      ...prev,
      [tab]: page,
    }));
  };

  const onFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    // Reset pagination when filters change
    setCurrentPages({
      developer: 1,
      international: 1,
      bank: 1,
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    isDialogOpen,
    setIsDialogOpen,
    selectedPartner,
    setSelectedPartner,
    currentPages,
    handleEdit,
    setCurrentPage,
    itemsPerPage,
    activeTab,
    setActiveTab,
    filters,
    onFiltersChange,
  };
}
