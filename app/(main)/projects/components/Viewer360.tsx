'use client';

import { useEffect, useRef } from 'react';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import 'photo-sphere-viewer/dist/plugins/markers.css';
import { Viewer } from 'photo-sphere-viewer';
import { useParams } from 'next/navigation';
import { useGetPublicProjectTabByIdQuery } from '@/features/project/projectApi';

export default function Viewer360() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const isViewerInitialized = useRef(false);
  const params = useParams();
  const { data: siteplan = {}, isLoading } = useGetPublicProjectTabByIdQuery({
    id: params.id as string,
    tab: 'siteplan',
  });

  const { view360 = [] } = siteplan;

  useEffect(() => {
    if (isViewerInitialized.current || view360.length === 0) return;
    isViewerInitialized.current = true;

    let viewer: any = null;

    // 1. Tạo các Map để tra cứu dữ liệu hiệu quả
    const idToPanoramaMap = new Map(view360.map((p: any) => [p.id, p]));
    const imageToIdMap = new Map(view360.map((p: any) => [p.image?.url, p.id]));

    // 2. Định nghĩa HTML và CSS cho marker để tái sử dụng
    const markerHtml = `
      <div class="relative center-both w-10 h-10 cursor-pointer animate-bounce-scale">
        <span class="absolute inline-flex w-10 h-10 bg-orange-300 rounded-full opacity-75 animate-[ping_1000ms_linear_infinite]"></span>
        <img src="/360-views/icon.png" class="relative inline-flex object-contain rounded-full" alt="icon" />
      </div>
      <style>
        @keyframes bounce-scale {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.15); }
        }
        .animate-bounce-scale { animation: bounce-scale 1s ease-in-out infinite; }
      </style>
    `;

    // 3. Tạo đối tượng chứa thông tin marker được nhóm theo panorama ID
    const markersByPanoramaId = view360.reduce((acc: any, panorama: any) => {
      acc[panorama.id] = panorama.markers.map((marker: any) => {
        // Chuyển đổi đường dẫn ảnh target thành ID target
        const targetId = imageToIdMap.get(marker.panoramaTarget);

        return {
          id: `marker-${panorama.id}-${marker.id}`, // Tạo ID marker duy nhất
          longitude: marker.longitude,
          latitude: marker.latitude,
          html: markerHtml,
          tooltip: marker.tooltip,
          scale: [0.5, 2],
          data: { panoramaTargetId: targetId }, // Sử dụng ID để liên kết
        };
      });
      return acc;
    }, {} as any);

    const initViewer: () => Promise<void> = async () => {
      if (!viewerRef.current) return;

      // Dynamic import

      const { MarkersPlugin } = await import(
        'photo-sphere-viewer/dist/plugins/markers'
      );

      const initialPanorama = view360[0];
      viewer = new Viewer({
        container: viewerRef.current,
        panorama: initialPanorama.image?.url, // Panorama ban đầu
        plugins: [[MarkersPlugin, {}]], // Chỉ cần khởi tạo plugin
        autorotateSpeed: '1rpm',
      });

      viewer.startAutorotate();

      const markersPlugin = viewer.getPlugin(MarkersPlugin);
      if (!markersPlugin) return;

      /**
       * Hàm này sẽ xóa các marker cũ và thêm vào các marker mới
       * tương ứng với panorama được cung cấp.
       */
      const setMarkersForPanorama = (panoramaId: any) => {
        markersPlugin.clearMarkers();
        const markers = markersByPanoramaId[panoramaId] || [];
        markersPlugin.setMarkers(markers);
      };

      // Lắng nghe sự kiện click vào marker
      markersPlugin.on('select-marker', (_e: any, marker: any) => {
        const targetId = marker.data?.panoramaTargetId;
        if (targetId) {
          const targetPanorama = idToPanoramaMap.get(targetId) as any;
          if (targetPanorama) {
            // Chuyển panorama và *sau đó* cập nhật lại marker
            viewer?.setPanorama(targetPanorama.image?.url).then(() => {
              setMarkersForPanorama(targetId);
            });
          }
        }
      });

      // Thêm marker cho panorama đầu tiên khi vừa tải xong
      viewer.once('ready', () => {
        setMarkersForPanorama(initialPanorama.id);
      });

      viewer.on('click', (_: any, data: any) => {
        console.log(`Longitude: ${data.longitude}, Latitude: ${data.latitude}`);
      });
    };

    initViewer();

    return () => {
      viewer?.destroy();
    };
  }, [view360]);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Đang tải dữ liệu 360 View.</p>
      </div>
    );
  if (view360.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">
          Hiện tại chưa có dữ liệu 360 View cho dự án này.
        </p>
      </div>
    );
  }

  return (
    <div ref={viewerRef} className="w-full h-screen z-50 fixed inset-0"></div>
  );
}
