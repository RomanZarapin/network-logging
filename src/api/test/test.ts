import { AxiosInstance } from "@/api/ApiUtils";

export const getTestData = async () => {
  const response = await AxiosInstance.get("/v1/bpi/currentprice.json");
  return response;
};
