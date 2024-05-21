import axios from "@/app/services/axios";
import { create } from 'zustand'

const useUserStore = create((set) => ({
  getUsers: async () => {
    try{
      const response = await axios.get('/users')
      return response.data
    }catch (error) {
      throw error;
    }
  },
  getUserById: async (id) => {
    try{
      const response = await axios.get(`/users/${id}`);
      return response.data;
    }catch (error) {
      throw error;
    }
  }
}));

export default useUserStore;