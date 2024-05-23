import { SpotifyClient } from "../client/client";
import { REST } from "../rest/rest";

export class Player{
    private rest: REST;

    public constructor(token: {access_token: string, refresh_token: string}, clientId: string, clientSecret: string) {
        this.rest = new REST(token, clientId, clientSecret);
    }

    public async playSong(songId: string) {
        return await this.rest.put('/me/player/play', {
            uris: [`spotify:track:${songId}`]
        });
    }

    public async pause() {
        return await this.rest.put('/me/player/pause', {});
    }

    public async next() {
        return await this.rest.post('/me/player/next', {});
    }

    public async previous() {
        return await this.rest.post('/me/player/previous', {});
    }

    public async seek(position: number) {
        return await this.rest.put('/me/player/seek', {
            position_ms: position
        });
    }

    public async shuffle(state: boolean) {
        return await this.rest.put('/me/player/shuffle', {
            state
        });
    }

    public async repeat(state: 'track' | 'context' | 'off') {
        return await this.rest.put('/me/player/repeat', {
            state
        });
    }

    public async volume(volume: number) {
        return await this.rest.put('/me/player/volume', {
            volume_percent: volume
        });
    }

    public async currentlyPlaying() {
        return await this.rest.get('/me/player/currently-playing');
    }

    public async getDevices() {
        return await this.rest.get('/me/player/devices');
    }

    public async transferPlayback(deviceId: string) {
        return await this.rest.put('/me/player', {
            device_ids: [deviceId]
        });
    }

    public async playContext(contextUri: string, offset: number = 0) {
        return await this.rest.put('/me/player/play', {
            context_uri: contextUri,
            offset: { position: offset }
        });
    }

    public async playPlaylist(playlistId: string, offset: number = 0) {
        return await this.playContext(`spotify:playlist:${playlistId}`, offset);
    }

    public async playAlbum(albumId: string, offset: number = 0) {
        return await this.playContext(`spotify:album:${albumId}`, offset);
    }

    public async playArtist(artistId: string, offset: number = 0) {
        return await this.playContext(`spotify:artist:${artistId}`, offset);
    }


    public async addToQueue(uri: string) {
        return await this.rest.post('/me/player/queue', {
            uri
        });
    }

    public async removeFromQueue(uri: string) {
        return await this.rest.delete('/me/player/queue', {
            uri
        });
    }

    public async getQueue() {
        return await this.rest.get('/me/player/queue');
    }

    public async getRecentlyPlayed() {
        return await this.rest.get('/me/player/recently-played');
    }

    public async getTopArtists() {
        return await this.rest.get('/me/top/artists');
    }

    public async getTopTracks() {
        return await this.rest.get('/me/top/tracks');
    }
}