import axios from "./axios";

export const getUsers = async () => {
  try{
    const response = await axios.get('/users')
    return response.data
  }catch (error) {
    throw error;
  }
}