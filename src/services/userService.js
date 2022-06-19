import http from "./httpService";
import config from "./config.json";

// Register 
export const registerUser = user => {
    return http.post(
        `${config.webapi}/api/v1/register`,
        JSON.stringify(user)
    );
};

// Login 
export const sendPhoneNumber = user => {
    return http.post(
        `${config.webapi}/api/v1/login`,
        JSON.stringify(user)
    );
};

// Verify sms code
export const verifySmsCode = user => {
    return http.post(
        `${config.webapi}/api/v1/verifySmsCode`,
        JSON.stringify(user)
    );
};
export const getToken = async () => {
    const token = await localStorage.getItem("token");
    return `Bearer ${token}`
}

export const getUserInformation = async () => {
    return http.get(
        `${config.webapi}/api/v1/user/getUserInfo`,
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth
    );
}
// Get User Info  -- Use Token
/*export const getUserInfo = async ()=> {
    return http.get(
    `${config.webapi}/api/v1/user/getUserInfo`,
    { headers:{ 'Authorization' : await getToken() } } // USER TOKEN => User Toekn from Local Storage for Auth
    );
} */

// Update user info  --  Method = POST
export const updateUserInfo = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/user/updateInfo`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth

    );
}

// Get User Reserves  -- Use Token
export const userReserves = async () => {
    return http.get(
        `${config.webapi}/api/v1/user/reserves`,
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth
    );
}

// Get User Transactions  -- Use Token
export const userTransactions = async () => {
    return http.get(
        `${config.webapi}/api/v1/user/transactions`,
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth
    );
}

// Get User Villas  -- Use Token
export const userVillas = async () => {
    return http.get(
        `${config.webapi}/api/v1/user/villas`,
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth
    );
}

// Get Villa data for edit  -- Use Token  --  id => villa id
export const editVilla = async id => {
    return http.get(
        `${config.webapi}/api/v1/user/editVilla/${id}`,
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth
    );
}


// Get User Villa Comments  -- Use Token  --  id => villa id
export const getUserVillaComments = async id => {
    return http.get(
        `${config.webapi}/api/v1/user/getUserVillaComments/${id}`,
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth
    );
}

// Replay comment from user panel  --  Method = POST
export const replayComment = async (data, villaId, parentId) => {
    return http.post(
        `${config.webapi}/api/v1/user/replayComment/${villaId}/${parentId}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth

    );
}

// Add comment for a villa  --  Method = POST -- id => villa id
export const addComment = async (data, id) => {
    return http.post(
        `${config.webapi}/api/v1/user/addComment/${id}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth

    );
}

// Get User Villa Dates  -- Use Token  --  id => villa id
export const villaDates = async id => {
    return http.get(
        `${config.webapi}/api/v1/user/villaDates/${id}`,
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth
    );
}

// Change Dates Cost (Customize villa costs)  --  Method = POST -- id => villa id
export const changeDatesCost = async (data, id) => {
    return http.post(
        `${config.webapi}/api/v1/user/changeDatesCost/${id}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}

// Change Dates Status (Customize villa status)  --  Method = POST -- id => villa id
export const changeDatesStatus = async (data, id) => {
    return http.post(
        `${config.webapi}/api/v1/user/changeDatesStatus/${id}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}

// Get All Reservations Requested  -- Use Token
export const allReservationsRequested = async () => {
    return http.get(
        `${config.webapi}/api/v1/user/allReservationsRequested`,
        {headers: {'Authorization': await getToken()}}
    );
}


export const getFinancialReports = async () => {
    return http.get(
        `${config.webapi}/api/v1/user/getFinancialReports`,
        {headers: {'Authorization': await getToken()}}
    );
}


export const setFinancialReports = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/user/setFinancialReports`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}


export const villaIncome = async id => {
    return http.get(
        `${config.webapi}/api/v1/user/villaIncome/${id}`,
        {headers: {'Authorization': await getToken()}}
    );
}

// Get One Reservations Requested Base id -- Use Token  --  id => villa id
export const reservationsRequested = id => {
    return http.get(
        `${config.webapi}/api/v1/user/reservationsRequested/${id}`,
        {headers: {'Authorization': `Bearer USER Token`}}
    );
}

// Change Reserve Status  --  Method = POST -- id => villa id
export const changeReserveStatus = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/user/changeReserveStatus`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}

// Withdrawal Request  --  Method = POST
export const withdrawal = async data => {
    return http.post(
        `${config.webapi}/api/v1/user/withdrawal`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}

// Get user favorite villas -- Use Token
export const favorites = async () => {
    return http.get(
        `${config.webapi}/api/v1/user/favorites`,
        {headers: {'Authorization': await getToken()}}
    );
}

// Add To Favorite  --  Method = POST
export const addToFavorite = async data => {
    return http.post(
        `${config.webapi}/api/v1/user/addToFavorite`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}

// Remove From Favorite  --  Method = POST
export const removeFromFavorite = async data => {
    return http.post(
        `${config.webapi}/api/v1/user/removeFromFavorite`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}


// Create a new villa  --  Method = POST
export const storeVilla = async data => {
    return http.post(
        `${config.webapi}/api/v1/villa/store`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}} // USER TOKEN => User Toekn from Local Storage for Auth

    );
}

// Reserve Request  --  Method = POST
export const reserveRequest = async data => {
    return http.post(
        `${config.webapi}/api/v1/reserveRequest`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}


export const SetImages = async (data, villaId) => {
    return http.post(
        `${config.webapi}/api/v1/villa/store/images/${villaId}`,
        data,
        {headers: {'Authorization': await getToken()}}
    );
}
export const calculateCost = async (data, villaId) => {
    return http.post(
        `${config.webapi}/api/v1/villa/calculateCost/${villaId}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}
export const calculateFacilitiesCost = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/villa/calculateFacilitiesCost`,
        JSON.stringify(data),
    );
}
export const calculateExtraCost = async (data, villaId) => {
    return http.post(
        `${config.webapi}/api/v1/villa/calculateExtraCost/${villaId}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}

export const reservationsSearch = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/user/reservationsSearch`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}
export const transactionsSearch = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/user/transactionsSearch`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}
export const financialReportsSearch = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/user/financialReportsSearch`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}
export const requestedReservationsSearch = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/user/requestedReservationsSearch`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}

export const getUserStock = async () => {
    return http.get(
        `${config.webapi}/api/v1/user/getUserStock`,
        {headers: {'Authorization': await getToken()}}
    );
}

export const updateUserAvatar = async (data) => {
    return http.post(
        `${config.webapi}/api/v1/user/updateUserAvatar`,
        (data),
        {headers: {'Authorization': await getToken()}}
    );
}
export const cancelReserve = async (id) => {
    return http.post(
        `${config.webapi}/api/v1/user/cancelReserve`,
        (id),
        {headers: {'Authorization': await getToken()}}
    );
}
export const cancelReservePrice = async (id) => {
    return http.post(
        `${config.webapi}/api/v1/user/cancelReservePrice`,
        (id),
        {headers: {'Authorization': await getToken()}}
    );
}


/* export const villaReservedDatesOnly = async (id) => {
    return http.get(
        `${config.webapi}/api/v1/user/villaReservedDates/${id}`,
        { headers:{ 'Authorization' : await getToken() } }
    );
}

export const villaClosedDates = async (id) => {
    return http.get(
        `${config.webapi}/api/v1/user/villaClosedDates/${id}`,
        { headers:{ 'Authorization' : await getToken() } }
    );
} */


export const closedReservedDates = async (id) => {
    return http.get(
        `${config.webapi}/api/v1/user/closedReservedDates/${id}`,
        {headers: {'Authorization': await getToken()}}
    );
}


export const updateVilla = async (data, id) => {
    return http.post(
        `${config.webapi}/api/v1/villa/update/${id}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}


export const getProvinces = async () => {
    return http.get(
        `${config.webapi}/api/v1/villa/getProvinces`,
        {headers: {'Authorization': await getToken()}}
    );
}

export const getCities = async (id) => {
    return http.get(
        `${config.webapi}/api/v1/villa/getCities/${id}`,
        {headers: {'Authorization': await getToken()}}
    );
}

/* for update and delete financial reports */
export const getFinancialReport = async (id) => {
    return http.get(
        `${config.webapi}/api/v1/user/getFinancialReport/${id}`,
        {headers: {'Authorization': await getToken()}}
    );
}
export const updateFinancialReport = async (data, id) => {
    return http.post(
        `${config.webapi}/api/v1/user/updateFinancialReport/${id}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}
export const deleteFinancialReport = async (id, data) => {
    return http.post(
        `${config.webapi}/api/v1/user/deleteFinancialReport/${id}`,
        JSON.stringify(data),
        {headers: {'Authorization': await getToken()}}
    );
}
