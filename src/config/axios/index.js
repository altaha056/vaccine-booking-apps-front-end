import axios from "axios";


const api = axios.create({
    baseURL:`${process.env.REACT_APP_BACKEND_URL}`
})
api.interceptors.response.use((res)=>res.data)
export default api