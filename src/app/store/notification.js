import axios from "@/app/services/axios";
import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  getNotifications: async () => {
    try{
      const response = await axios.get('/notifications')
      return response.data
    }catch (error) {
      throw error;
    }
  },
  readNotification: async (args = {}) => {
    try {
      await axios.patch(`/notifications/${args.id}`);
    } catch (error) {
      throw error;
    }
  }
}));

export default useNotificationStore;