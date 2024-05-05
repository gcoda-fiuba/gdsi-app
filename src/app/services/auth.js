import axios from "./axios";
import cache from "@/app/services/cache";

//  IMPORTANTE, NOE STA HACIENDO EL CATCH DE ERRORES!

export const login = async (args = {}) => {
  return axios.post('/auth/login', args)
    .then(response => {
        cache.set('token', response.data.token);
        return response;
    })
    .catch(error => {
        return error;
    });
}

export const register = async (args = {}) => {
    return axios.post('/register', args)
        .then(response => {
            cache.set('token', response.data.token);
            return response;
        })
        .catch(error => {
            return error;
        });
}