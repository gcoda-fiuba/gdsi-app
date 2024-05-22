import axios from "@/app/services/axios";
import { create } from 'zustand'

const useGroupStore = create((set) => ({
  members: null,
  categories: null,
  expenses: null,
  debts: null,
  current: null,
  fetch: async () => {
    try{
      const response = await axios.get('/groups')
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
  getCategories: async (args = {}) => {
    try {
      const response = await axios.get('/categories')
      set({ categories: response.data });
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