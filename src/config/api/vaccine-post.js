import api from "../axios";

export const getVaccineList = () => api.get("/vacs")