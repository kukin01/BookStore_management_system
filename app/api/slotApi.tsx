import axios from 'axios';

const API_URL = 'http://your-backend-url.com/api/slots'; // Replace with your actual backend URL

type FetchSlotsParams = {
  page?: number;
  limit?: number;
  name?: string; // For search
  // Add other filters your backend supports
};

export const fetchSlots = async (params: FetchSlotsParams) => {
  try {
    const response = await axios.get(API_URL, { params });
    return {
      data: response.data.data, 
      totalPages: response.data.totalPages,
      totalItems: response.data.totalItems
    };
  } catch (error) {
    throw new Error('Failed to fetch slots');
  }
};

// Add other slot-related API calls as needed
export const createSlot = async (slotData: any) => {
  const response = await axios.post(API_URL, slotData);
  return response.data;
};

export const deleteSlot = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};