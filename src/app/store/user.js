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
  modifyUserConfiguration: async (id, args ={}) => {
    try{
      const response = await axios.put(`/users/${id}/config`, args);
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
  },
  getUserConfiguration: async (id) => {
    try{
      const response = await axios.get(`/users/${id}/config`);
      return response.data;
    }catch (error) {
      throw error;
    }
  },
  getFile: async () => {
    try{
      //const response = await axios.get(`/debts`);
      //return response.data;
      const data ="bmFtZSxhZ2UsY2l0eQpKb2huIERvZSwyOSxOZXcgWW9yawpKYW5lIFNtaXRoLDM0LExvcyBBbmdlbGVzCkVtaWx5IEpvaG5zb24sMjIsQ2hpY2FnbwpNaWNoYWVsIEJyb3duLDQ1LEhvdXN0b24K";
      return data;
    }catch (error) {
      throw error;
    }
  },

}));

export default useUserStore;