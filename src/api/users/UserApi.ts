import { AxiosInstance } from "@/api/ApiUtils";
import { userData } from "@/views/Users/interfaces/userInterfaces";


export const getUserList = async (parameters: { page: number; per_page: number; }) => {
    const response = await AxiosInstance.get("/api/users", {
        params: parameters
    });
    return response;
}

export const getUserData = async (id: number) => {
    const response = await AxiosInstance.get(`/api/users/${id}`);
    return response;
}

export const addUser = async (params: userData) => {
    const response = await AxiosInstance.post(`/api/users`, {
        params: params
    });
    return response;
}

export const updateUser = async (id: number, params: userData) => {
    const response = await AxiosInstance.put(`/api/users/${id}`, {
        params: params
    });
    return response;
}

export const deleteUser = async (id: number) => {
    const response = await AxiosInstance.delete(`/api/users/${id}`);
    return response;
}