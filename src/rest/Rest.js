"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REST = void 0;
class REST {
    token;
    refreshToken;
    clientId;
    clientSecret;
    async request(options) {
        const response = await fetch("https://api.spotify.com/v1" + options.route, {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token,
            },
            body: JSON.stringify(options.body)
        });
        if (!response.ok && response.status === 401) {
            const success = await this.refresh();
            if (success) {
                return await this.request(options);
            }
        }
        if (options.method === 'GET') {
            return await response.json();
        }
        else {
            return true;
        }
    }
    constructor(token, clientId, clientSecret) {
        this.token = token.access_token;
        this.refreshToken = token.refresh_token;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    get(route) {
        return this.request({ method: 'GET', route });
    }
    post(route, body) {
        return this.request({ method: 'POST', route, body });
    }
    put(route, body) {
        return this.request({ method: 'PUT', route, body });
    }
    delete(route, body) {
        return this.request({ method: 'DELETE', route });
    }
    async refresh() {
        const url = "https://accounts.spotify.com/api/token";
        const auth = Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64');
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + auth,
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: this.refreshToken,
                client_id: this.clientId
            }),
        };
        const reponse = await fetch(url, payload);
        const res = await reponse.json();
        this.token = res.access_token;
        return true;
    }
}
exports.REST = REST;
