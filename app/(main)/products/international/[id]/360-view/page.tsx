'use client';

import { useEffect, useRef } from 'react';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import 'photo-sphere-viewer/dist/plugins/markers.css';
import { Viewer } from 'photo-sphere-viewer';

let check = false;

export default function Viewer360() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (check) return;
    check = true;
    console.log(1);

    let viewer: any = null;
    // Dữ liệu marker cho từng panorama
    const markersByPanorama: any = {
      '/360-views/panorama.jpg': [
        {
          id: 'go-to-beverly',
          longitude: 1.2,
          latitude: -0.3,
          html: `
            <div class="relative flex items-center justify-center w-10 h-10 cursor-pointer animate-bounce-scale">
              <span class="absolute inline-flex w-10 h-10 bg-orange-400 rounded-full opacity-75 animate-[ping_1000ms_linear_infinite]"></span>
              <img 
                src="/360-views/icon.png" 
                class="relative inline-flex object-contain rounded-full"
                alt="icon"
              />
            </div>
            <style>
              @keyframes bounce-scale {
                0%, 100% {
                  transform: translateY(0) scale(1);
                }
                50% {
                  transform: translateY(-8px) scale(1.15);
                }
              }
              .animate-bounce-scale {
                animation: bounce-scale 1s ease-in-out infinite;
              }
            </style>
          `,
          width: 100,
          height: 100,
          tooltip: 'Đi đến The Beverly',
          data: { panoramaTarget: '/360-views/beverly.jpg' },
          scale: [1, 4],
        },
      ],
      '/360-views/beverly.jpg': [
        {
          id: 'go-back-to-panorama',
          longitude: 0,
          latitude: 0,
          html: `
            <div class="relative flex items-center justify-center w-10 h-10 cursor-pointer animate-bounce-scale">
              <span class="absolute inline-flex w-10 h-10 bg-orange-400 rounded-full opacity-75 animate-[ping_1000ms_linear_infinite]"></span>
              <img 
                src="/360-views/icon.png" 
                class="relative inline-flex object-contain rounded-full"
                alt="icon"
              />
            </div>
            <style>
              @keyframes bounce-scale {
                0%, 100% {
                  transform: translateY(0) scale(1);
                }
                50% {
                  transform: translateY(-8px) scale(1.15);
                }
              }
              .animate-bounce-scale {
                animation: bounce-scale 1s ease-in-out infinite;
              }
            </style>
          `,
          width: 100,
          height: 100,
          tooltip: 'Quay lại tổng thể',
          data: { panoramaTarget: '/360-views/panorama.jpg' },
          scale: [1, 4],
        },
      ],
    };

    const initViewer: () => Promise<void> = async () => {
      if (!viewerRef.current) return;

      // Dynamic import

      const { MarkersPlugin } = await import(
        'photo-sphere-viewer/dist/plugins/markers'
      );

      viewer = new Viewer({
        container: viewerRef.current,
        panorama: '/360-views/panorama.jpg', // Panorama ban đầu
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
        const markers = markersByPanorama[panoramaId] || [];
        markersPlugin.setMarkers(markers);
      };

      // Lắng nghe sự kiện click vào marker
      markersPlugin.on('select-marker', (_e: any, marker: any) => {
        const target = marker.data?.panoramaTarget;
        if (target) {
          // Chuyển panorama và *sau đó* cập nhật lại marker
          viewer?.setPanorama(target).then(() => {
            setMarkersForPanorama(target);
          });
        }
      });

      // Thêm marker cho panorama đầu tiên khi vừa tải xong
      viewer.once('ready', () => {
        setMarkersForPanorama('/360-views/panorama.jpg');
      });

      viewer.on('click', (_: any, data: any) => {
        console.log('Longitude:', data.longitude);
        console.log('Latitude:', data.latitude);
      });
    };

    initViewer();

    return () => {
      viewer?.destroy();
    };
  }, []);

  return (
    <div
      ref={viewerRef}
      style={{ width: '100%', height: '100vh', zIndex: 1000 }}
    ></div>
  );
}
