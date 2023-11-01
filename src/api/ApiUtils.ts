import Axios from "axios";

export const AxiosInstance = Axios.create({
  baseURL: process.env.VUE_APP_SERVER_BASE_URL,
  headers: { "Authorization": "Basic " + process.env.VUE_APP_TOKEN},
});
