import api from "../axios";

export const getVaccineList = () => api.get("/vacs");
export const addVacineData = (data) => api.post("/vacs", data);
