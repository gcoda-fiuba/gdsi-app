import axios from "./axios";

export const fetch = async () => {
  try{
    const response = await axios.get('/groups')
    return response.data
  }catch (error) {
    throw error;
  }
}