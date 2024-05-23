"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyClient = void 0;
const player_1 = require("../player/player");
const Rest_1 = require("../rest/Rest");
class SpotifyClient {
    rest;
    player;
    constructor(access_token, refresh_token, clientId, clientSecret) {
        this.rest = new Rest_1.REST({ access_token, refresh_token }, clientId, clientSecret);
        this.player = new player_1.Player({ access_token, refresh_token }, clientId, clientSecret);
    }
    async me() {
        return await this.rest.get('/me');
    }
    async getUserPlaylists() {
        return await this.rest.get('/me/playlists');
    }
    async getPlaylist(playlistId) {
        return await this.rest.get(`/playlists/${playlistId}`);
    }
    async createPlaylist(name, description, isPublic) {
        return await this.rest.post('/users/me/playlists', {
            name,
            description,
            public: isPublic
        });
    }
    async addTracksToPlaylist(playlistId, uris) {
        return await this.rest.post(`/playlists/${playlistId}/tracks`, {
            uris
        });
    }
    async search(query, type, limit = 20) {
        return await this.rest.get(`/search?q=${query}&type=${type}&limit=${limit}`);
    }
    async getTrack(id) {
        return await this.rest.get(`/tracks/${id}`);
    }
    async getAlbum(id) {
        return await this.rest.get(`/albums/${id}`);
    }
    async getArtist(id) {
        return await this.rest.get(`/artists/${id}`);
    }
    async getPlaylistTracks(playlistId) {
        return await this.rest.get(`/playlists/${playlistId}/tracks`);
    }
    async getArtistAlbums(artistId) {
        return await this.rest.get(`/artists/${artistId}/albums`);
    }
    async getAlbumTracks(albumId) {
        return await this.rest.get(`/albums/${albumId}/tracks`);
    }
}
exports.SpotifyClient = SpotifyClient;
