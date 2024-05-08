import axios from "./axios";

export const getNotifications = async () => {
  try{
    const response = await axios.get('/notifications')
    return response.data
  }catch (error) {
    throw error;
  }
}