"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRouter = exports.trackRouter = exports.userRouter = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var track_1 = require("./track");
Object.defineProperty(exports, "trackRouter", { enumerable: true, get: function () { return __importDefault(track_1).default; } });
var playlist_1 = require("./playlist");
Object.defineProperty(exports, "playlistRouter", { enumerable: true, get: function () { return __importDefault(playlist_1).default; } });
//# sourceMappingURL=index.js.map