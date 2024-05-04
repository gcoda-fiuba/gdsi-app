import axios from "./axios";
import cache from "@/app/services/cache"

export const login = async (args = {}) => {
  return axios.post('/auth/login', args, {
    headers: {
      "Content-type": 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      console.log("Response es", response)
      cache.set('token', '6359a97b1ba5b3666098d6cfc521933c')
      return response
    })
    .catch(error => {
      return error.response.data
    })
}