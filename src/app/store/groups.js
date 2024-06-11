import axios from "@/app/services/axios";
import { create } from 'zustand'

const useGroupStore = create((set) => ({
  groups: [],
  members: null,
  categories: null,
  expenses: null,
  debts: [],
  current: null,
  fetch: async () => {
    try{
      const response = await axios.get('/groups')
      set({groups: response.data});
      return response.data
    }catch (error) {
      throw error;
    }
  },
  getGroupById: async (id) => {
    try{
      const response = await axios.get(`/groups/${id}`)
      set({ current: response.data });
      return response.data
    }catch (error) {
      throw error;
    }
  },
  create: async (args = {}) => {
    try {
      const response = await axios.post('/groups', args);
      return response.data;
    } catch(error) {
      throw error;
    }
  },
  addCustomCategory: async (args = {}) => {
    try {
      const response = await axios.post(`/groups/${args.groupId}/categories`, args);
      return response.data;
    } catch(error) {
      throw error;
    }
  },
  getMembers: async (id) => {
    try{
      const response = await axios.get(`/groups/${id}/integrant`)
      set({ members: response.data });
      return response.data
    }catch (error) {
      throw error;
    }
  },
  addMember: async (args = {}) => {
    try{
      const response = await axios.post(`/groups/${args.id}/integrant`, {userId: args.userId})
      return response.data
    }catch (error) {
      throw error;
    }
  },
  removeMember: async (args = {}) => {
    try{
      const response = await axios.delete(`/groups/${args.id}/integrant`, {data: {email: args.email}})
      return response.data
    }catch (error) {
      throw error;
    }
  },
  getBills: async (id) => {
    try{
      const response = await axios.get(`/groups/${id}/bills`)
      set({ expenses: response.data });
      return response.data
    }catch (error) {
      throw error;
    }
  },
  addBill: async (args = {}) => {
    try{
      const response = await axios.post('/groups/bill', args)
      return response.data
    }catch (error) {
      throw error;
    }
  },
  patchBill: async (id, args = {}) => {
    try{
      const response = await axios.patch(`/debts/${id}`, args)
      return response.data
    }catch (error) {
      throw error;
    }
  },
  getCategories: async (groupId) => {
    try {
      const response = await axios.get(`/groups/${groupId}/categories`)
      set({ categories: response.data });
      return response.data
    } catch (error) {
      throw error;
    }
  },
  postCategories: async (args = {}) => {
    // Use this to post a new personalized categories for expenses in a group
    try {
      const response = await axios.post('/categories', args)
      return response.data
    } catch (error) {
      throw error;
    }
  },
  getDebts: async (groupId)=> {
    try {
      const response = await axios.get(`/groups/debts/${groupId}`);
      set({ debts: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}));

export default useGroupStore;