import type { Request, Response } from "express";
import { PrismaClient } from  "@prisma/client"

const prisma = new PrismaClient();

// CREATE playlist
export const store = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        await prisma.playlist.create({ data: data });
        res.status(201).json({ ok: true, message: "Playlist creado correctamente" });
    } catch(error) {
        console.log(error)
        res.status(500).json({ ok: false, message: error });
    }
};

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const playlists = await prisma.playlist.findMany();
      res.status(200).json({
        ok: true,
        data: playlists,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };

  export const addTrackOnPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { trackId, playlistId, create_at } = req.body;
        await prisma.tracksOnPlaylist.create({ data: {
            trackId,
            playlistId,
            create_at: new Date(create_at)}
        });
        res.status(201).json({ ok: true, message: "Cancion agregada en playlist correctamente" });
    } catch(error) {
        res.status(500).json({ ok: false, message: error });
    }
};

export const trackOnPlaylistById = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    try {
        const tracksOnPlaylist = await prisma.playlist.findUnique({
            where: {id},
            include: {track: true}
         });
        res.status(200).json({ ok: true, data: tracksOnPlaylist });
    } catch(error) {
        res.status(500).json({ ok: false, message: error });
    }