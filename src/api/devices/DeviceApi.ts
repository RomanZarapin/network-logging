import { AxiosInstance } from "@/api/ApiUtils";

export const getDeviceList = async () => {
    const response = await AxiosInstance.get("/api/devices");
    return response;
}