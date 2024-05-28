import axios from "@/app/services/axios";
import { create } from 'zustand'
import cache from "@/app/services/cache";

const useUserStore = create((set) => ({
  users: null,
  currentUser: null,
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
      if (id === cache.get('Id')) set({currentUser: response.data});
      return response.data;
    }catch (error) {
      throw error;
    }
  }
}));

export default useUserStore;