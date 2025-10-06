'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllEnumsQuery } from '@/features/enum/enumApi';
import { clearEnum, setEnum } from '@/features/enum/enumSlice';

export function EnumLoader() {
  const dispatch = useDispatch();
  const { data: enumsData, error } = useGetAllEnumsQuery();

  useEffect(() => {
    if (enumsData) {
      dispatch(setEnum(enumsData));
    } else if (error) {
      dispatch(clearEnum());
    }
  }, [enumsData, error, dispatch]);

  return null;
}
