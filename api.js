import axios from "axios";

const api = axios.create({
    baseURL : "http://127.0.0.1:8000/"
})

api.interceptors.request.use(
    (config) => {
        const token =  localStorage.getItem("access");
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        if (token && !config.url.includes('/login') && !config.url.includes('/register')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

export default api
