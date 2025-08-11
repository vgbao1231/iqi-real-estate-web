import { BankTab } from '@/app/(admin)/admin/partners/tabs/bank-tab';
import { DeveloperTab } from '@/app/(admin)/admin/partners/tabs/developer-tab';
import { InternationalTab } from '@/app/(admin)/admin/partners/tabs/international-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Globe, Landmark } from 'lucide-react';

interface PartnersTabsProps {
  searchTerm: string;
  onEdit: (partner: any) => void;
  currentPages: {
    developer: number;
    international: number;
    bank: number;
  };
  setCurrentPage: (
    tab: 'developer' | 'international' | 'bank',
    page: number
  ) => void;
  itemsPerPage: number;
  filters: {
    partnershipYear: string[];
    partnerType: string[];
    specialty: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
}

export function PartnersTabs({
  searchTerm,
  onEdit,
  currentPages,
  setCurrentPage,
  filters,
  itemsPerPage,
}: PartnersTabsProps) {
  return (
    <Tabs defaultValue="developer" className="space-y-4">
      <TabsList className="w-full flex items-center bg-white border border-gray-200">
        <TabsTrigger
          value="developer"
          className="flex flex-1 items-center gap-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
        >
          <Building2 className="h-4 w-4" />
          Chủ đầu tư
        </TabsTrigger>
        <TabsTrigger
          value="international"
          className="flex flex-1 items-center gap-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
        >
          <Globe className="h-4 w-4" />
          Đối tác quốc tế
        </TabsTrigger>
        <TabsTrigger
          value="bank"
          className="flex flex-1 items-center gap-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
        >
          <Landmark className="h-4 w-4" />
          Đối tác ngân hàng
        </TabsTrigger>
      </TabsList>

      <TabsContent value="developer">
        <DeveloperTab
          searchTerm={searchTerm}
          onEdit={onEdit}
          currentPage={currentPages.developer}
          setCurrentPage={(page) => setCurrentPage('developer', page)}
          itemsPerPage={itemsPerPage}
          filters={filters}
        />
      </TabsContent>

      <TabsContent value="international">
        <InternationalTab
          searchTerm={searchTerm}
          onEdit={onEdit}
          currentPage={currentPages.international}
          setCurrentPage={(page) => setCurrentPage('international', page)}
          itemsPerPage={itemsPerPage}
          filters={filters}
        />
      </TabsContent>

      <TabsContent value="bank">
        <BankTab
          searchTerm={searchTerm}
          onEdit={onEdit}
          currentPage={currentPages.bank}
          setCurrentPage={(page) => setCurrentPage('bank', page)}
          itemsPerPage={itemsPerPage}
          filters={filters}
        />
      </TabsContent>
    </Tabs>
  );
}
