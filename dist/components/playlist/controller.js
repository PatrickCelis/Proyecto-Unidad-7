"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackOnPlaylistById = exports.addTrackOnPlaylist = exports.findAll = exports.store = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// CREATE playlist
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield prisma.playlist.create({ data: data });
        res.status(201).json({ ok: true, message: "Playlist creado correctamente" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
});
exports.store = store;
const findAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlists = yield prisma.playlist.findMany();
        res.status(200).json({
            ok: true,
            data: playlists,
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.findAll = findAll;
const addTrackOnPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trackId, playlistId, create_at } = req.body;
        yield prisma.tracksOnPlaylist.create({ data: {
                trackId,
                playlistId,
                create_at: new Date(create_at)
            }
        });
        res.status(201).json({ ok: true, message: "Cancion agregada en playlist correctamente" });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.addTrackOnPlaylist = addTrackOnPlaylist;
const trackOnPlaylistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const tracksOnPlaylist = yield prisma.playlist.findUnique({
            where: { id },
            include: { track: true }
        });
        res.status(200).json({ ok: true, data: tracksOnPlaylist });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.trackOnPlaylistById = trackOnPlaylistById;
