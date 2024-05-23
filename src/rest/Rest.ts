interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    route: string;
    headers?: { [key: string]: string };
    body?: any;
}

export class REST {
    private token: string;
    private refreshToken: string;
    private clientId: string;
    private clientSecret: string;

    private async request(options: RequestOptions) {
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
        } else return true;
    }

    public constructor(token: {access_token: string, refresh_token: string}, clientId: string, clientSecret: string) {
        this.token = token.access_token;
        this.refreshToken = token.refresh_token;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
   
    public get(route: string) {
        return this.request({ method: 'GET', route });
    }

    public post(route: string, body: any) {
        return this.request({ method: 'POST', route, body });
    }

    public put(route: string, body: any) {
        return this.request({ method: 'PUT', route, body });
    }

    public delete(route: string, body: any) {
        return this.request({ method: 'DELETE', route });
    }

    public async refresh() {
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