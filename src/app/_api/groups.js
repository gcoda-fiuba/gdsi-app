import axios from "@/api/axios";

export function fetchGroups() {
  return axios.get('/groups');
}

export function createGroup(groupData) {
  return axios.post('/groups', groupData);
}