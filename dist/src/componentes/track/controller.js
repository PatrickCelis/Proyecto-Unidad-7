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
exports.delete_track_by_id = exports.update_track = exports.get_track_by_id = exports.findAll = exports.store = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, artist, album, year, genre, duration } = req.body;
        yield prisma.track.create({ data: {
                name,
                artist,
                album,
                year: new Date(year),
                genre,
                duration
            } });
        res.status(201).json({ ok: true, message: "Track creado correctamente" });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.store = store;
const findAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tracks = yield prisma.track.findMany();
        res.status(200).json({
            ok: true,
            data: tracks,
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.findAll = findAll;
const get_track_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const tracks = yield prisma.track.findUnique({
            where: { id }
        });
        res.status(200).json({
            data: tracks,
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.get_track_by_id = get_track_by_id;
const update_track = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, artist, album, year, genre, duration } = req.body;
    try {
        const tracks = yield prisma.track.update({
            where: { id },
            data: {
                name,
                artist,
                album,
                year: new Date(year),
                genre,
                duration
            }
        });
        res.status(200).json({
            message: "Actualizado correctamente",
            data: tracks,
        });
    }
    catch (error) {
        res.status(204).json({ ok: false, message: error });
    }
});
exports.update_track = update_track;
const delete_track_by_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.track.delete({
            where: { id },
        });
        res.status(200).json({
            ok: true, message: "Eliminado Correctamente"
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false, message: error
        });
    }
});
exports.delete_track_by_id = delete_track_by_id;
//# sourceMappingURL=controller.js.map