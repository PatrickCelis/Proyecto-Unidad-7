"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const trackRouter = (0, express_1.Router)();
trackRouter.post("/", controller_1.store);
trackRouter.get("/", controller_1.findAll);
trackRouter.get("/:id", controller_1.get_track_by_id);
trackRouter.put("/:id", controller_1.update_track);
trackRouter.delete("/:id", controller_1.delete_track_by_id);
exports.default = trackRouter;
//# sourceMappingURL=index.js.map