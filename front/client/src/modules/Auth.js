/**
 * Created by usign on 30/04/17.
 */

class Auth {

    /**
     *Authenticate a user. Save a token string in Local Storage
     * @param {string} token
     */
    static  authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        let isAuthenticate = localStorage.getItem('authenticate');
        return isAuthenticate !== null && isAuthenticate;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken() {
        return localStorage.getItem('token');
    }

}

export default  Auth;