'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProvincesQuery } from '@/features/location/locationApi';
import { setLocationData } from '@/features/location/locationSlice';

export function LocationLoader() {
  const dispatch = useDispatch();
  const { data: locationData, isSuccess } = useGetProvincesQuery();

  useEffect(() => {
    // Chỉ xử lý và lưu dữ liệu khi API thành công và có dữ liệu
    if (isSuccess && locationData.length > 0) {
      // 1. XỬ LÝ DỮ LIỆU PROVINCES
      const provinces = [
        { value: 'all', label: 'Tất cả thành phố' },
        ...locationData.map((p) => ({
          value: p.name,
          label: p.name,
        })),
      ];

      // 2. XỬ LÝ DỮ LIỆU DISTRICTS
      const districts = {
        all: [{ value: 'all', label: 'Tất cả quận/huyện' }], // Chú ý: 'khu vực' -> 'quận/huyện'
        ...Object.fromEntries(
          locationData.map((p) => [
            p.name,
            [
              { value: 'all', label: 'Tất cả quận/huyện' },
              ...p.districts.map((d: { name: string }) => ({
                value: d.name,
                label: d.name,
              })),
            ],
          ])
        ),
      };

      dispatch(setLocationData({ provinces, districts }));
    }
  }, [locationData, isSuccess, dispatch]);
  return null;
}
