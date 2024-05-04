import axios from "./axios";
import cache from "@/app/services/cache";
import {redirect} from "next/navigation";

export const login = async (args = {}) => {
  return axios.post('/auth/login', args)
    .then(response => {
      cache.set('token', response.data.token);
      // redirect('/dashboard')
    })
    .catch(error => {
      return error.response.data;
    });
}

export const register = async (args = {}) => {
    return axios.post('/register', args)
        .then(response => {
            cache.set('token', response.data.token);
            // redirect('/dashboard');
        })
        .catch(error => {
            return error.response.data;
        });
}