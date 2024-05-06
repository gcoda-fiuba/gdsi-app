import axiosBase from 'axios';
import cache from "@/app/services/cache";


const axios = axiosBase.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(function (xhr) {
  const token = cache.get('token')

  if(token){
    xhr.headers["Authorization"] = token
  }

  return xhr
})

/*axios.interceptors.response.use(response => response, error => {
  const errorMsg = error.response?.data?.message || 'Error de comunicación con la API';
  throw new Error(errorMsg);
});*/

export default axios;