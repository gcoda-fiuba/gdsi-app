import axios from "@/app/services/axios";
import { create } from 'zustand'

const useUserStore = create((set) => ({
  users: null,
  getUsers: async () => {
    try{
      const response = await axios.get('/users')
      set({users: response.data})
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