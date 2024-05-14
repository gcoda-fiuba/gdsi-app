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

export const getExpenses = async (id) => {
  const mockExpenses = [
    { id: 1, description: 'Pizza for the meeting', amount: 25.00 },
    { id: 2, description: 'Office supplies', amount: 40.00 },
    { id: 3, description: 'Projector rental', amount: 100.00 },
  ];

  try{
    /*const response = await axios.get(`/groups/${id}/expenses`)
    return response.data*/
    return mockExpenses
  }catch (error) {
    throw error;
  }
}