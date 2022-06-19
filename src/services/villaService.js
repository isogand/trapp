import http from "./httpService";

import config from "./config.json";

// Get General data of villa   --   id = Villa id
export const villa= id =>{
    return http.get(`${config.webapi}/api/v1/villa/show/${id}`);
}

// Get villa comments   --   id = Villa id
export const villaComments= id =>{
    return http.get(`${config.webapi}/api/v1/villa/comments/${id}`);
}

// Get villa images  --   id = Villa id
export const villaImages= id =>{
    return http.get(`${config.webapi}/api/v1/villa/images/${id}`);
}

// Get reserved dates of villa   --   id = Villa id
export const reservedDates= id =>{
    return http.get(`${config.webapi}/api/v1/villa/reservedDates/${id}`);
}

// Get similar villas of villa   --   id = Villa id
export const similarVillas= id =>{
    return http.get(`${config.webapi}/api/v1/villa/similarVillas/${id}`);
}
export const villaPrice = id =>{
    return http.get(`${config.webapi}/api/v1/villa/villaPrices/${id}`);
}
// Create a new villa  --  Method = POST
/* export const storeVilla = data => {
    return http.post(

    `${config.webapi}/api/v1/villa/store`, 
    JSON.stringify(data),
    { headers:{ 'Authorization' : `Bearer USER Token` } } // USER TOKEN => User Toekn from Local Storage for Auth
    
    );
} */