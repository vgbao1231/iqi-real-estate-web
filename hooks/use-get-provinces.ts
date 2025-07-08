import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: async () => {
      const res = await axios.get('https://provinces.open-api.vn/api/?depth=2');
      return res.data;
    },
  });
};
