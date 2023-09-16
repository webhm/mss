class ApiHTTP {
    static apiUrl = '/api';
    constructor() {
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            ApiHTTP.apiUrl = '/api';
        } else {
            ApiHTTP.apiUrl = 'https://mss.hospitalmetropolitano.org/api';
        }

    }
}

export default ApiHTTP;