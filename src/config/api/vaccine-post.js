import api from "../axios";

export const getVaccineList = () => api.get("/vacs");
export const registerUser = (data) => api.post("/users/register", data);
