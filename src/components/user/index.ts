import { Router } from "express";
import { findAll, login, signup } from "./controller";

const userRouter: Router = Router();

userRouter.get("/", findAll);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter;