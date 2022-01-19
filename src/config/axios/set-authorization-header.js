import api from "./.";

export default (token = null) => {
  if (token) api.defaults.headers.common.Authorization = `bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
};
