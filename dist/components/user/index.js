"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/", controller_1.findAll);
userRouter.post("/", controller_1.store);
exports.default = userRouter;
