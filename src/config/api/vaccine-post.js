import api from "../axios";

export const getVaccineList = () => api.get("/vacs");
export const registerUser = (data) => api.post("/users/register", data);

export const loginUser = (data) => api.post("/users/login", data);
export const detailsOwnUser = () => api.get("/user");
