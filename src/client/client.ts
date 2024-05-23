import { Player } from "../player/player";
import { REST } from "../rest/rest";

export class SpotifyClient {
    private rest: REST;
    public player: Player;

    public constructor(data: {accessToken: string, refreshToken: string, clientId: string, clientSecret: string}) {
        const access_token = data.accessToken;
        const refresh_token = data.refreshToken;
        this.rest = new REST({access_token, refresh_token}, data.clientId, data.clientSecret);
        this.player = new Player({access_token, refresh_token}, data.clientId, data.clientSecret);

        // Send a request to the API to get the user's information (this will refresh the access token if an expired token is provided)
        this.me()
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