import axios from 'axios';
import { DogGetRequest, DogGetResponse } from '@/types/dogs';
import { CreateDevice } from '@/types/devices';

export const fetchDogs = async (dogRequest: DogGetRequest, token: string) => {
  const { page = 0, limit = 10, type } = dogRequest;
  const url = `/api2/dog?type=${type}&page=${page}&limit=${limit}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(url, { headers });
  return response.data as DogGetResponse;
};
export const fetchCreateDevice = async (
  device: CreateDevice,
  token: string,
) => {
  const url = `/api2/device`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(url, device, { headers });
  return response.data as DogGetResponse;
};
