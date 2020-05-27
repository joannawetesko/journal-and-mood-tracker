import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('jwt_access_token');
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    });

axios.interceptors.response.use(
    (response) => { return response }, 
    async (error) => {
        const originalRequest = error.config;
     
        /* avoid infinite loop in case of /token and /token/refresh returning status 401 */
        if (error.response.status === 401 && 
                (originalRequest.url === `token/refresh/` || originalRequest.url === `token/`)) {
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const response = await axios.post(`token/refresh/`, {
                'refresh': localStorage.getItem('jwt_refresh_token')
            })
            localStorage.setItem('jwt_access_token', response.data.access);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' 
                + localStorage.getItem('jwt_access_token');
            return axios(originalRequest);
        }
        return Promise.reject(error);
     });

export async function login(username, password) {
    const response = await axios.post(`token/`, {
        username: username,
        password: password
      }
    );
    return response.data;
}

export function logout() {
    localStorage.clear();
}

export async function register(username, password) {
    const response = await axios.post(`user/`, {
        username: username,
        password: password
      });
    return response.status;
};

export async function getMood(date) {
    try {
        const response = await axios.get(`mood/?date=${date}`);
        return (response.data[0] !== undefined) ? response.data[0].mood : '';
    }
    catch (error) {
        if (error.status === 401) { /* fail silently if only token refresh is needed */ }
        else { throw error; }
    }
};

export async function sendMood(date, value) {
    const response = await axios.get(`mood/?date=${date}`);
    (Array.isArray(response.data) && response.data.length === 0)
        ? axios.post(`mood/`, {'mood': value})
        : axios.put(`mood/${response.data[0].pk}/`, {'mood': value});
}

export async function getJournal(date) {
    try {
        const response = await axios.get(`journal/?date=${date}`);
        return (response.data[0] !== undefined) ? response.data[0].body : '';
    }
    catch (error) {
        if (error.status === 401) { /* fail silently if only token refresh is needed */ }
        else { throw error; }
    }
};

export async function sendJournal(date, value) {
    const response = await axios.get(`journal/?date=${date}`);
    (Array.isArray(response.data) && response.data.length === 0)
        ? axios.post(`journal/`, {'body': value})
        : axios.put(`journal/${response.data[0].pk}/`, {'body': value});
};