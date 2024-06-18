import { REST } from "../rest/rest";

export class Player{
    private rest: REST;

    public constructor(token: {access_token: string, refresh_token: string}, clientId: string, clientSecret: string) {
        this.rest = new REST(token, clientId, clientSecret);
    }

    public async getPlaybackState() {
        return await this.rest.get(`/me/player`);
    }

    public async transferPlayback(deviceId: string) {
        return await this.rest.put(`/me/player`, {
            device_ids: [deviceId]
        });
    }

    public async getAvailableDevices() {
        return await this.rest.get(`/me/player/devices`)
    }

    public async getCurrentTrack() {
        return await this.rest.get(`/me/player/currently-playing`)
    }

    public async playContext(contextUri: string, offset: number = 0) {
        return await this.rest.put(`/me/player/play`, {
            context_uri: contextUri,
            offset: { position: offset }
        });
    }

    public async pausePlayback(deviceId: string | undefined = undefined) {
        if (!deviceId) {
            return await this.rest.put(`/me/player/pause`)
        } else {
            return await this.rest.put(`/me/player/pause?device_id=${deviceId}`)
        }
    }

    public async skipToNext(deviceId: string | undefined = undefined) {
        if (!deviceId) {
            return await this.rest.post(`/me/player/next`)
        } else {
            return await this.rest.post(`/me/player/next?device_id=${deviceId}`)
        }
    }

    public async skipToLast(deviceId: string | undefined = undefined) {
        if (!deviceId) {
            return await this.rest.post(`/me/player/previous`)
        } else {
            return await this.rest.post(`/me/player/previous?device_id=${deviceId}`)
        }
    }

    public async seekToPosition(positionMs: number = 0, deviceId: string | undefined = undefined) {
        if (!deviceId) {
            return await this.rest.post(`/me/player/previous?position_ms=${positionMs}`)
        } else {
            return await this.rest.post(`/me/player/previous?position_ms=${positionMs}&device_id=${deviceId}`)
        }
    }
}