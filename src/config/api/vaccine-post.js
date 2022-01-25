import api from "../axios";

export const getVaccineList = () => api.get("/vacs");
export const registerUser = (data) => api.post("/users/register", data);

export const loginUser = (data) => api.post("/users/login", data);
export const detailsOwnUser = () => api.get("/user");

export const getParticipantbyUser = () => {
  return api.get("/participant/user");
};

export const getNearbyFacilities = (data) => api.post("/near", data);

export const adminLogin = (data) => api.post("/admin/login", data);

export const registerParticipant = (data, vacId) =>
  api.post("/participant", data, { params: { vacId } });

export const getParticipantbyId = (userId) => api.get(`/participant/${userId}`);

export const getVacbyAdminId = (adminId) => api.get(`/vacbyadmin/${adminId}`);

export const getVacbyId = (vacId) => api.get(`/vac/${vacId}`);

export const getParticipantByVacId = (adminId) =>
  api.get(`/participant/vac/${adminId}`);

export const putParticipantVaccinated = (id) =>
  api.put("/participant/vaccinated", null, { params: { id } });

export const putParticipantCanceled = (id) =>
  api.put("/participant/canceled", null, { params: { id } });

export const deleteVac = (id) => api.delete(`/vac/${id}`);

export const addVacApi = (data) => api.post("/vac", data);

export const deleteParticipant = (id) => api.delete(`/participant/${id}`);

export const updateVac = (data) => api.put("/vac");
