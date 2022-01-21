import axios from "axios";
import errorHandler from "./error-handler";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});
api.interceptors.response.use((res) => res.data, errorHandler);

export { default as setAuthorizationHeader } from "./set-authorization-header";

export default api;
