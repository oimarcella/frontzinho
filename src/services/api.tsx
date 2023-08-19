import axios from 'axios';


const currentLocation = window.location.href;

let linkApi = currentLocation.substring(7, 16) === "localhost" ?
    import.meta.env.VITE_REACT_APP_PROD_BACKEND_URL //Se quiser bater na api localmente, trocar essa linha para -> import.meta.env.VITE_REACT_APP_LOCAL_BACKEND_URL
    :
    import.meta.env.VITE_REACT_APP_PROD_BACKEND_URL;

const api = axios.create({
    baseURL: linkApi,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "OPTIONS, DELETE, POST, GET, PATCH, PUT",
        "Access-Control-Allow-Credentials": "true"
    }
})
export default api