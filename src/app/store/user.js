import axios from "@/app/services/axios";
import { create } from 'zustand'
import cache from "@/app/services/cache";

const useUserStore = create((set) => ({
  users: [],
  currentUser: null,
  reportsDashboardToken: null,
  reportsDashboardTokenSlim: null,
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
  modifyUserConfiguration: async (id, args ={}) => {
    try{
      const response = await axios.put(`/users/${id}/config`, args);
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  getReportsDashboardToken: async () => {
    try{
      const response = await axios.get('/dashboards/user');
      set({reportsDashboardToken: response.data.token});
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  getReportsDashboardTokenSlim: async () => {
    try{
      const response = await axios.get('/dashboards/slim');
      set({reportsDashboardTokenSlim: response.data.token});
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  getUserConfiguration: async (id) => {
    try{
      const response = await axios.get(`/users/${id}/config`);
      return response.data;
    }catch (error) {
      throw error;
    }
  },

}));

export default useUserStore;