'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

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
import { TimelineTab } from '@/app/(admin)/admin/projects/tabs/timeline-tab';
import { Arsenal } from 'next/font/google';
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
  Milestone,
} from 'lucide-react';
import { PreviewDialog } from '@/app/(admin)/admin/projects/components/PreviewDialog';
const arsenal = Arsenal({
  subsets: ['latin'],
  weight: ['400', '700'], // Chỉ định độ đậm
  style: ['normal', 'italic'], // Thêm kiểu thường và nghiêng
  display: 'swap',
});

export default function Projects() {
  // State to manage which view is active: list or edit form
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null); // null for list view or project ID for editing

  const { project, updateProject, updateNestedProject, handleSave } =
    useProjectData(editingProjectId);

  // If editingProjectId is null, show the list of projects
  if (editingProjectId === null) {
    return <ProjectsList onEditProject={setEditingProjectId} />;
  }

  const tabConfig = !project
    ? []
    : [
        {
          value: 'introduction',
          label: 'Giới thiệu',
          icon: FileText,
          component: (
            <IntroductionTab
              project={project}
              updateProject={updateProject}
              handleSave={handleSave}
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
              handleSave={handleSave}
            />
          ),
        },
        {
          value: 'amenity',
          label: 'Tiện ích',
          icon: Wifi,
          component: (
            <AmenityTab
              amenity={project.amenity}
              updateProject={updateProject}
              handleSave={handleSave}
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
              handleSave={handleSave}
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
              handleSave={handleSave}
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
              handleSave={handleSave}
            />
          ),
        },

        {
          value: 'timeline',
          label: 'Timeline',
          icon: Milestone,
          component: (
            <TimelineTab
              timeline={project.timeline}
              updateProject={updateProject}
              handleSave={handleSave}
            />
          ),
        },
        {
          value: 'contact',
          label: 'Liên hệ',
          icon: Phone,
          component: (
            <ContactTab
              contact={project.contact}
              updateProject={updateProject}
              updateNestedProject={updateNestedProject}
              handleSave={handleSave}
            />
          ),
        },
        {
          value: 'other',
          label: 'Khác',
          icon: Settings,
          component: (
            <OtherTab
              project={project}
              updateProject={updateProject}
              updateNestedProject={updateNestedProject}
              handleSave={handleSave}
            />
          ),
        },
      ];

  if (!project) return <></>;

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
            <PreviewDialog project={project} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="introduction" className="space-y-6">
          <TabsList className="grid w-full grid-cols-9">
            {tabConfig.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabConfig.map(({ value, component }) => (
            <TabsContent
              key={value}
              value={value}
              className={arsenal.className}
            >
              {component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
