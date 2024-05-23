import { Player } from "../player/player";
import { REST } from "../rest/Rest";

export class SpotifyClient {
    public rest: REST;
    public player: Player;

    public constructor(access_token: string, refresh_token: string, clientId: string, clientSecret: string) {
        this.rest = new REST({access_token, refresh_token}, clientId, clientSecret);
        this.player = new Player({access_token, refresh_token}, clientId, clientSecret);
    }

    public async me() {
        return await this.rest.get('/me');
    }

    public async getUserPlaylists() {
        return await this.rest.get('/me/playlists');
    }

    public async getPlaylist(playlistId: string) {
        return await this.rest.get(`/playlists/${playlistId}`);
    }

    public async createPlaylist(name: string, description: string, isPublic: boolean) {
        return await this.rest.post('/users/me/playlists', {
            name,
            description,
            public: isPublic
        });
    }

    public async addTracksToPlaylist(playlistId: string, uris: string[]) {
        return await this.rest.post(`/playlists/${playlistId}/tracks`, {
            uris
        });
    }

    public async search(query: string, type: 'track' | 'album' | 'artist' | 'playlist', limit: number = 20) {
        return await this.rest.get(`/search?q=${query}&type=${type}&limit=${limit}`);
    }

    public async getTrack(id: string) {
        return await this.rest.get(`/tracks/${id}`);
    }

    public async getAlbum(id: string) {
        return await this.rest.get(`/albums/${id}`);
    }

    public async getArtist(id: string) {
        return await this.rest.get(`/artists/${id}`);
    }

    public async getPlaylistTracks(playlistId: string) {
        return await this.rest.get(`/playlists/${playlistId}/tracks`);
    }

    public async getArtistAlbums(artistId: string) {
        return await this.rest.get(`/artists/${artistId}/albums`);
    }

    public async getAlbumTracks(albumId: string) {
        return await this.rest.get(`/albums/${albumId}/tracks`);
    }
}