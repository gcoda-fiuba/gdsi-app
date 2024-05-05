import axios from "./axios";
import cache from "@/app/services/cache";
import {redirect} from "next/navigation";

export const login = async (args = {}) => {
  return axios.post('/auth/login', args)
    .then(response => {
        cache.set('token', response.data.token);
      // redirect('/dashboard');
        return response.data;
    })
    .catch(error => {
        return error.response.data;
    });
}

//  IMPORTANTE, NOE STA HACIENDO EL CATCH DE ERRORES!
export const register = async (args = {}) => {
    return axios.post('/register', args)
        .then(response => {
            cache.set('token', response.data.token);
            // redirect('/dashboard');
            return response;
        })
        .catch(error => {
            return error;
        });
}