import { Router } from "express";
import { findAll, store, get_track_by_id, update_track, delete_track_by_id } from "./controller";

const trackRouter: Router = Router();

trackRouter.post("/", store);
trackRouter.get("/", findAll);
trackRouter.get("/:id", get_track_by_id);
trackRouter.put("/:id", update_track);
trackRouter.delete("/:id", delete_track_by_id);

export default trackRouter;