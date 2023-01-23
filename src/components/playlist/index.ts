import { Router } from "express";
import { store, findAll, addTrackOnPlaylist, trackOnPlaylistById } from "./controller";

const playlistRouter: Router = Router();

playlistRouter.post("/", store);
playlistRouter.get("/", findAll);
playlistRouter.put("/add", addTrackOnPlaylist);
playlistRouter.get("/:id", trackOnPlaylistById);

export default playlistRouter;