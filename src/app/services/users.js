import axios from "@/app/services/axios";

export const fetchUsers = async () => {
    try{
        const response = await axios.get('/users');
        // response.data.map(user => console.log(user));
        return response.data;
    }catch (error) {
        throw error;
    }
}