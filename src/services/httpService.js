import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retries: 5});
// Exponential back-off retry delay between requests
axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay});

// Custom retry delay
axiosRetry(axios, {
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    }
});

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(null, error => {

    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedErrors) {
        console.log(error);
        alert("لطفا مجددا تلاش کنید");
        // window.location.reload();
    }

    return Promise.reject(error);

});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}