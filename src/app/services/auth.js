import axios from "./axios";
import cache from "@/app/services/cache";

export const login = async (args = {}) => {
  try{
    const response = await axios.post('/auth/login', args)
    cache.set('token', response.data.hash);
    return response.data
  }catch (error) {
    throw error;
  }
}

export const register = async (args = {}) => {
  try{
    const response = await axios.post('/register', args)
    return response.data
  }catch (error) {
    throw error;
  }
}

export const logOut = async () => {
  try{
    cache.remove('token');
  }catch (error) {
    throw error;
  }
}

export const verifyAccount = async (args = {}) => {
  try{
    const response = await axios.get(`/register/verify?token=${args.token}`);
    cache.set('token', args.token);
    return response.data
  }catch (error) {
    throw error;
  }
}