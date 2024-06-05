import axios from "@/app/services/axios";
import { create } from 'zustand'
import cache from "@/app/services/cache";

const useUserStore = create((set) => ({
  users: [],
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
  },
  editUserInfo: async (user = {}) => {
    try{
      const response = await axios.patch(`/users/${user.id}`, user);
      set({currentUser: user});
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  getReportsDashboard: async () => {
    try{
      const response = await axios.get('/dashboards/user');
      return response.data;
    }catch (error) {
      throw error;
    }
  }
}));

export default useUserStore;