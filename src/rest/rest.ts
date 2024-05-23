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

    private async request(options: RequestOptions): Promise<any> {
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
        } if (options.method === 'GET') {
            return await response.json();
        } else {
            return true;
        }
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

    private async refresh() {
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
        }

        const reponse = await fetch(url, payload);
        const res = await reponse.json();

        this.token = res.access_token;

        return true;
    }
}