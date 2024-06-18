import { REST } from "../rest/rest";

export class Album{
    private rest: REST;

    public constructor(token: {access_token: string, refresh_token: string}, clientId: string, clientSecret: string) {
        this.rest = new REST(token, clientId, clientSecret);
    }

    private async playContext(contextUri: string, offset: number = 0) {
        return await this.rest.put(`/me/player/play`, {
            context_uri: contextUri,
            offset: { position: offset }
        });
    }

    public async playAlbum(albumId: string, offset: number = 0) {
        return await this.playContext(`spotify:album:${albumId}`, offset);
    }

}