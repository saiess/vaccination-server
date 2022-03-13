"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Center_Controller_1 = require("../controllers/Center.Controller");
const requireUser_1 = __importDefault(require("../middlewares/requireUser"));
const validateResource_1 = __importDefault(require("../middlewares/validateResource"));
const Center_Schema_1 = require("../schema/Center.Schema");
function centerRoutes(app) {
    app.post('/api/centers', [
        requireUser_1.default,
        (0, validateResource_1.default)(Center_Schema_1.CreateCenterSchema),
        Center_Controller_1.CreateCenterHandler,
    ]);
    app.put('/api/centers/:centerId', [
        requireUser_1.default,
        (0, validateResource_1.default)(Center_Schema_1.UpdateCenterSchema),
        Center_Controller_1.UpdateCenterHandler,
    ]);
    app.get('/api/centers/:centerId', [
        requireUser_1.default,
        (0, validateResource_1.default)(Center_Schema_1.GetCenterSchema),
        Center_Controller_1.GetCenterHandler,
    ]);
    app.delete('/api/centers/:centerId', [
        requireUser_1.default,
        (0, validateResource_1.default)(Center_Schema_1.DeleteCenterSchema),
        Center_Controller_1.DeleteCenterHandler,
    ]);
}
exports.default = centerRoutes;
