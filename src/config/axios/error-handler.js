export default (error) => {
  if (error) {
    let message;
    if (error.response) {
      if (error.response.status === 401 || error.response.data === 400) {
        message = "sesi kamu sudah habis, yuk login lagi";
        localStorage.removeItem("vac:token");
        window.location.href = "/user/login";
        return;
      }
      return Promise.reject(error.response.data);
    }
  }
};
