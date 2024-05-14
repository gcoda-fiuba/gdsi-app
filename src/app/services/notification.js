import axios from "./axios";

export const getNotifications = async () => {
  try{
    const response = await axios.get('/notifications')
    return response.data
  }catch (error) {
    throw error;
  }
}

export const readNotification = async (args = {}) => {
  try {
    await axios.patch(`/notifications/${args.id}`);
  } catch (error) {
    throw error;
  }
}