import http from "./httpService";

import config from "./config.json";


export const getToken = async () =>{
    const token = await localStorage.getItem("token");
    return `Bearer ${token}`
}


// Get Reservation Factor   --   id = Reservation id
export const factor = async id => {
    return http.get(
        `${config.webapi}/api/v1/factor/${id}`,
        { headers: { 'Authorization': await getToken() } } // USER TOKEN => User Toekn from Local Storage for Auth
    );
}

// Request Payment  --  Method = POST
export const requestPay = async data => {
    return http.post(

    `${config.webapi}/api/v1/request/pay`, 
    JSON.stringify(data),
    { headers:{ 'Authorization' : await getToken() } }
    
    );
}

export const chargeWallet = async data => {
    return http.post(

        `${config.webapi}/api/v1/chargeWallet`,
        JSON.stringify(data),
        { headers:{ 'Authorization' : await getToken() } }

    );
}


// Get Payment Status  --  Method = POST
export const getPayStatus = data => {
    return http.post(

    `${config.webapi}/api/v1/getPayStatus`, 
    JSON.stringify(data),
    { headers:{ 'Authorization' : `Bearer USER Token` } }
    
    );
}