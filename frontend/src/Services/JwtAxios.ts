import axios from "axios";
import store from "../Redux/Store";
const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request => {
    // If user logged in:
    if (store.getState().authState.user) {
        // Add the token to request headers:
        request.headers = {
            "authorization": "Bearer " + store.getState().authState.user.token
        };
    }
    
    return request;
});

export default jwtAxios;
