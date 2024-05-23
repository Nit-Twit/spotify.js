"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const rest_1 = require("../rest/rest");
class Player {
    rest;
    constructor(token, clientId, clientSecret) {
        this.rest = new rest_1.REST(token, clientId, clientSecret);
    }
    async playSong(songId) {
        return await this.rest.put('/me/player/play', {
            uris: [`spotify:track:${songId}`]
        });
    }
    async pause() {
        return await this.rest.put('/me/player/pause', {});
    }
    async next() {
        return await this.rest.post('/me/player/next', {});
    }
    async previous() {
        return await this.rest.post('/me/player/previous', {});
    }
    async seek(position) {
        return await this.rest.put('/me/player/seek', {
            position_ms: position
        });
    }
    async shuffle(state) {
        return await this.rest.put('/me/player/shuffle', {
            state
        });
    }
    async repeat(state) {
        return await this.rest.put('/me/player/repeat', {
            state
        });
    }
    async volume(volume) {
        return await this.rest.put('/me/player/volume', {
            volume_percent: volume
        });
    }
    async currentlyPlaying() {
        return await this.rest.get('/me/player/currently-playing');
    }
    async getDevices() {
        return await this.rest.get('/me/player/devices');
    }
    async transferPlayback(deviceId) {
        return await this.rest.put('/me/player', {
            device_ids: [deviceId]
        });
    }
    async playContext(contextUri, offset = 0) {
        return await this.rest.put('/me/player/play', {
            context_uri: contextUri,
            offset: { position: offset }
        });
    }
    async playPlaylist(playlistId, offset = 0) {
        return await this.playContext(`spotify:playlist:${playlistId}`, offset);
    }
    async playAlbum(albumId, offset = 0) {
        return await this.playContext(`spotify:album:${albumId}`, offset);
    }
    async playArtist(artistId, offset = 0) {
        return await this.playContext(`spotify:artist:${artistId}`, offset);
    }
    async addToQueue(uri) {
        return await this.rest.post('/me/player/queue', {
            uri
        });
    }
    async removeFromQueue(uri) {
        return await this.rest.delete('/me/player/queue', {
            uri
        });
    }
    async getQueue() {
        return await this.rest.get('/me/player/queue');
    }
    async getRecentlyPlayed() {
        return await this.rest.get('/me/player/recently-played');
    }
    async getTopArtists() {
        return await this.rest.get('/me/top/artists');
    }
    async getTopTracks() {
        return await this.rest.get('/me/top/tracks');
    }
}
exports.Player = Player;
