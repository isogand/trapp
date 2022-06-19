import http from "./httpService";

import config from "./config.json";

// Get Popular Villas 
export const popularVillas=()=>{
    return http.get(`${config.webapi}/api/v1/popularVillas`);
}

// Get Home Banners 
export const getBanners=()=>{
    return http.get(`${config.webapi}/api/v1/getBanners`);
}

// Get Discounted Villas 
export const discountedVillas=()=>{
    return http.get(`${config.webapi}/api/v1/discountedVillas`);
}

// Get Economic Villas 
export const economicVillas=()=>{
    return http.get(`${config.webapi}/api/v1/economicVillas`);
}