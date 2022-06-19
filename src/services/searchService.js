import http from "./httpService";
import config from "./config.json";


// First search
export const search = () => {
    return http.get(`${config.webapi}/api/v1/search`);
}

// Searching according to parameters
export const doSearch = params => {
    return http.get(
        `${config.webapi}/api/v1/doSearch`, { params }
    );
}
