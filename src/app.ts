import express, { type Application } from 'express';
import * as ROUTER from "./componentes";
import cors from "cors";

const app: Application = express();

app.use(express.json());

app.use (cors());

app.use("/api/v1/users", ROUTER.userRouter);
app.use("/api/v1/tracks", ROUTER.trackRouter);
app.use("/api/v1/playlist", ROUTER.playlistRouter);

export default app;