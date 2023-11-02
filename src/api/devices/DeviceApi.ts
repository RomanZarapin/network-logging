import { AxiosInstance } from "@/api/ApiUtils";

export const getDeviceList = async (parameters: { page: number; per_page: number; }) => {
    const response = await AxiosInstance.get("/api/devices", {
        params: parameters
    });
    return response;
}

export const getDeviceData = async (id: number) => {
    console.log(id)
    const response = await AxiosInstance.get(`/api/devices/${id}/requests`);
    return response;
}