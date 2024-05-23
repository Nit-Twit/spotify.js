"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.REST = exports.SpotifyClient = void 0;
const client_1 = require("./client/client");
Object.defineProperty(exports, "SpotifyClient", { enumerable: true, get: function () { return client_1.SpotifyClient; } });
const Rest_1 = require("./rest/Rest");
Object.defineProperty(exports, "REST", { enumerable: true, get: function () { return Rest_1.REST; } });
const player_1 = require("./player/player");
Object.defineProperty(exports, "Player", { enumerable: true, get: function () { return player_1.Player; } });
