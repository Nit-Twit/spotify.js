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
        if (options.method === 'GET') {
            return await response.json();
        }
        else
            return true;
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
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
            },
            body: `grant_type=refresh_token&refresh_token=${this.refreshToken}`
        });
        const data = await response.json();
        this.token = data.access_token;
    }
}
exports.REST = REST;
