import axios from "@/app/services/axios";
import { create } from 'zustand'

const useDebtsStore = create((set) => ({
  debts: [],
  getMyDebts: async () => {
    try{
      const response = await axios.get('/debts')
      set({debts: response.data});
      return response.data
    }catch (error) {
      throw error;
    }
  }
}));

export default useDebtsStore;