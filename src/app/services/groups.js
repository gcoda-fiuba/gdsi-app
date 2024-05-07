import axios from "./axios";

export const fetch = async () => {
  try{
    const response = await axios.get('/groups')
    return response.data
  }catch (error) {
    throw error;
  }
}

export const create = async (args) => {
  try {
    const response = await axios.post('/groups', args);
    return response.data;
  } catch(error) {
    throw error;
  }
}