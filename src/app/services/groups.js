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

export const getMembers = async (id) => {
  try{
    const response = await axios.get(`/groups/${id}/integrant`)
    return response.data
  }catch (error) {
    throw error;
  }
}

export const addMember = async (args = {}) => {
  try{
    const response = await axios.post(`/groups/${args.groupId}/integrant`, {email: args.email})
    return response.data
  }catch (error) {
    throw error;
  }
}

export const removeMember = async (args = {}) => {
  try{
    const response = await axios.delete(`/groups/${args.id}/integrant`, {data: {email: args.email}})
    return response.data
  }catch (error) {
    throw error;
  }
}