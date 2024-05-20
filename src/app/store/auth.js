import axios from "@/app/services/axios";
import cache from "@/app/services/cache";
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  login: async (args = {}) => {
    try{
      const response = await axios.post('/auth/login', args)
      cache.set('token', response.data.hash);
      cache.set('Name', response.data.first_name + " " + response.data.last_name);
      set({ user: response.data });
      return response.data
    }catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try{
      cache.remove('token');
      set({ user: null, token: null })
    }catch (error) {
      throw error;
    }
  },
  register: async (args = {}) => {
    try{
      const response = await axios.post('/register', args)
      return response.data
    }catch (error) {
      throw error;
    }
  },
  verifyAccount: async (args = {}) => {
    try{
      const response = await axios.get(`/register/verify?token=${args.token}`);
      cache.set('token', args.token);
      return response.data
    }catch (error) {
      throw error;
    }
  }
}));

export default useAuthStore;