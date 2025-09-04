'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Building2,
  MapPin,
  Package,
  Wifi,
  Phone,
  Settings,
  FileText,
  ArrowLeft,
  LayoutGrid,
} from 'lucide-react';
import { useProjectData } from '@/hooks/use-project-data';
import { ProjectsList } from './components/ProjectsList';
import { AmenityTab } from './tabs/amenity-tab';
import { ContactTab } from './tabs/contact-tab';
import { IntroductionTab } from './tabs/introduction-tab';
import { LocationTab } from './tabs/location-tab';
import { OtherTab } from './tabs/other-tab';
import { OverviewTab } from './tabs/overview-tab';
import { ProductionTab } from './tabs/production-tab';
import { SiteplanTab } from '@/app/(admin)/admin/projects/tabs/siteplan-tab';

export default function Projects() {
  const {
    project,
    updateProject,
    updateNestedProject,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    addProduct,
    updateProductField,
    removeProduct,
    editingPolicyIndex,
    setEditingPolicyIndex,
  } = useProjectData();

  // State to manage which view is active: list or edit form
  const [editingProjectId, setEditingProjectId] = useState<
    string | number | null
  >(null); // null for list view, "new" for new project, or project ID for editing

  // If editingProjectId is null, show the list of projects
  if (editingProjectId === null) {
    return <ProjectsList onEditProject={setEditingProjectId} />;
  }

  const tabConfig = [
    {
      value: 'introduction',
      label: 'Giới thiệu',
      icon: FileText,
      component: (
        <IntroductionTab
          introduction={project.introduction}
          updateProject={updateProject}
        />
      ),
    },
    {
      value: 'overview',
      label: 'Tổng quan',
      icon: Building2,
      component: (
        <OverviewTab
          overview={project.overview}
          updateProject={updateProject}
        />
      ),
    },
    {
      value: 'location',
      label: 'Vị trí',
      icon: MapPin,
      component: (
        <LocationTab
          location={project.location}
          updateProject={updateProject}
          updateNestedProject={updateNestedProject}
        />
      ),
    },
    {
      value: 'siteplan',
      label: 'Mặt bằng',
      icon: LayoutGrid,
      component: (
        <SiteplanTab
          siteplan={project.siteplan}
          updateProject={updateProject}
        />
      ),
    },
    {
      value: 'production',
      label: 'Sản phẩm',
      icon: Package,
      component: (
        <ProductionTab
          production={project.production}
          updateProject={updateProject}
          addProduct={addProduct}
          updateProductField={updateProductField}
          removeProduct={removeProduct}
        />
      ),
    },
    {
      value: 'amenity',
      label: 'Tiện ích',
      icon: Wifi,
      component: (
        <AmenityTab amenity={project.amenity} updateProject={updateProject} />
      ),
    },
    {
      value: 'contact',
      label: 'Liên hệ',
      icon: Phone,
      component: (
        <ContactTab contact={project.contact} updateProject={updateProject} />
      ),
    },
    {
      value: 'other',
      label: 'Khác',
      icon: Settings,
      component: (
        <OtherTab
          other={project.other}
          updateProject={updateProject}
          updateNestedProject={updateNestedProject}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          updateArrayItem={updateArrayItem}
          editingPolicyIndex={editingPolicyIndex}
          setEditingPolicyIndex={setEditingPolicyIndex}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingProjectId(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {editingProjectId === 'new'
                    ? 'Thêm dự án mới'
                    : 'Chỉnh sửa dự án'}
                </h1>
                <p className="text-gray-600">
                  Cập nhật thông tin chi tiết dự án
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="introduction" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            {tabConfig.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabConfig.map(({ value, component }) => (
            <TabsContent key={value} value={value}>
              {component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
