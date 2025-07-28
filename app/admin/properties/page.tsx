'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Save,
  Building2,
  MapPin,
  Package,
  Wifi,
  Phone,
  Settings,
  FileText,
} from 'lucide-react';

import { AmenityTab } from './tabs/amenity-tab';
import { ContactTab } from './tabs/contact-tab';
import { IntroductionTab } from './tabs/introduction-tab';
import { LocationTab } from './tabs/location-tab';
import { OtherTab } from './tabs/other-tab';
import { OverviewTab } from './tabs/overview-tab';
import { ProductionTab } from './tabs/production-tab';
import { useProjectData } from '@/hooks/use-project-data';

export default function RealEstateAdmin() {
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
  const [activeTab, setActiveTab] = useState('introduction'); // Set active tab to other for easier testing

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Quản lý dự án bất động sản
              </h1>
              <p className="text-gray-600">Cập nhật thông tin chi tiết dự án</p>
            </div>
            <Button className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Lưu thay đổi</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger
              value="introduction"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Giới thiệu</span>
            </TabsTrigger>
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2"
            >
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Tổng quan</span>
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Vị trí</span>
            </TabsTrigger>
            <TabsTrigger
              value="production"
              className="flex items-center space-x-2"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Sản phẩm</span>
            </TabsTrigger>
            <TabsTrigger
              value="amenity"
              className="flex items-center space-x-2"
            >
              <Wifi className="h-4 w-4" />
              <span className="hidden sm:inline">Tiện ích</span>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Liên hệ</span>
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Khác</span>
            </TabsTrigger>
          </TabsList>

          {/* Introduction Tab */}
          <TabsContent value="introduction">
            <IntroductionTab
              introduction={project.introduction}
              updateProject={updateProject}
            />
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab
              overview={project.overview}
              updateProject={updateProject}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
            />
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location">
            <LocationTab
              location={project.location}
              updateProject={updateProject}
              updateNestedProject={updateNestedProject}
            />
          </TabsContent>

          {/* Production Tab */}
          <TabsContent value="production">
            <ProductionTab
              production={project.production}
              updateProject={updateProject}
              addProduct={addProduct}
              updateProductField={updateProductField}
              removeProduct={removeProduct}
            />
          </TabsContent>

          {/* Amenity Tab */}
          <TabsContent value="amenity">
            <AmenityTab
              amenity={project.amenity}
              updateProject={updateProject}
            />
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <ContactTab
              contact={project.contact}
              updateProject={updateProject}
            />
          </TabsContent>

          {/* Other Tab */}
          <TabsContent value="other">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
