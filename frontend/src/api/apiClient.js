import axios from 'axios';

//TODO: add proper error handling

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

axios.interceptors.response.use((response) => {
        return response
     }, function (error) {
        const originalRequest = error.config;
     
        // avoid infinite loop in case of /auth/token/ returning status 401
        if (error.response.status === 401 && 
                originalRequest.url === `http://localhost:8000/api/token/`) {
            // TODO: logout user and redirect to login page
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            axios.post(`http://localhost:8000/api/token/refresh/`, {
                'refresh': localStorage.getItem('jwt_refresh_token')
            }).then(response => {
                localStorage.setItem('jwt_access_token', response.data.access)
                localStorage.setItem('jwt_refresh_token', response.data.refresh)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' 
                    + localStorage.getItem('jwt_access_token');
                return axios(originalRequest);
            })
        }
        return Promise.reject(error);
     });

export function login(username, password) {
    axios.post(`http://localhost:8000/api/token/`, {
        username: username,
        password: password
      }
    ).then(response => {
        localStorage.setItem('jwt_access_token', response.data.access);
        localStorage.setItem('jwt_refresh_token', response.data.refresh);
        localStorage.setItem('username', username);
    }, (error) => {
        console.log(error);
    });
    return;
}

export function logout() {
    localStorage.clear();
}

export function register(username, password) {
    axios.post(`http://localhost:8000/api/user/`, {
        username: username,
        password: password
      }
    ).then(response => { 
        //TODO: redirect to login page
     }, (error) => { console.log(error); });
};

export function getMood(date) {
    axios.get(`http://localhost:8000/api/mood/?date=${date}`)
        .then(response => {
            return (response.data[0] !== undefined) ? response.data[0].mood : '';
        });
};

export function sendMood(date, value) {
    axios.get(`http://localhost:8000/api/mood/?date=${date}`)
        .then(response => {
            (Array.isArray(response.data) && response.data.length === 0)
            ? axios.post(`mood/`, {'mood': value})
            : axios.put(`mood/${response.data[0].pk}/`, {'mood': value});
        });
}

export function getJournal(date) {
    axios.get(`http://localhost:8000/api/journal/?date=${date}`)
        .then(response => {
            return (response.data[0] !== undefined) ? response.data[0].body : '';
        });
};

export function sendJournal(date, value) {
    axios.get(`http://localhost:8000/api/journal/?date=${date}`)
        .then(response => {
            (Array.isArray(response.data) && response.data.length === 0)
                ? axios.post(`journal/`, {'body': value})
                : axios.put(`journal/${response.data[0].pk}/`, {'body': value});
        });
};