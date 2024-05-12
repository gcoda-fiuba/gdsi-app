import axios from "./axios";

export const getNotifications = async () => {
  try{
    const response = await axios.get('/notifications')
    console.log(response.data);
    return response.data
  }catch (error) {
    throw error;
  }
}

export const readNotification = async (args = {}) => {
  try {
    const response = await axios.patch(`/notifications/${args.id}`);
  } catch (error) {
    throw error;
  }
}