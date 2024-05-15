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
    const response = await axios.post(`/groups/${args.id}/integrant`, {userId: args.userId})
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

export const getBills = async (id) => {
  try{
    const response = await axios.get(`/groups/${id}/bills`)
    return response.data
  }catch (error) {
    throw error;
  }
}

export const addBill = async (args = {}) => {
  try{
    const response = await axios.post('/groups/bill', args)
    return response.data
  }catch (error) {
    throw error;
  }
}

export const getCategories = async () => {
  try{
    const response = await axios.get('/categories')
    return response.data
  }catch (error) {
    throw error;
  }
}