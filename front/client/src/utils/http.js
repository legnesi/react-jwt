import fetch from "isomorphic-fetch";
import Auth from '../modules/Auth';
import { browserHistory } from 'react-router';

function superFetch(url, method, data) {
    let params = {
        method: method,
        headers: {
            "accept": "application/json",
            "content-Type": "application/json"
        },
        credentials: "same-origin"
    };

    if (data) {
        params.body = JSON.stringify(data);
    }

    const token = Auth.getToken();
    if(token) {
        params.headers.Authorization = "Bearer " + token;
    }

    return fetch(url, params)
        .then(response => response.text().then(body => {
            let empty = !body;
            let isJson = false;
            var responsePromise = Promise.resolve();
            if(response.headers.has("Content-Type") && response.headers.get("Content-Type")) {
                isJson = response.headers.get("Content-Type").indexOf("application/json") >= 0;
            }
            if (response.ok) {
                //store token if exist
                if(response.headers.has("token")) {
                    Auth.authenticateUser(response.headers.get("token"));
                }
                responsePromise = (empty || !isJson ? Promise.resolve() : Promise.resolve(JSON.parse(body)));
            } else {
                if (response.status === 401) {
                    browserHistory.push('/login');
                }else {
                    responsePromise = (empty || !isJson ? Promise.reject(response) : Promise.reject(JSON.parse(body)));
                }
            }
            return responsePromise;
        })).catch(error => {
            console.log("ERROR FETCH:", error)
        });
}

const http = {
    get: url => superFetch(url, "get"),
    post: (url, data) => superFetch(url, "post", data),
    put: (url, data) => superFetch(url, "put", data),
    delete: (url, data) => superFetch(url, "delete", data)
};

export default http;