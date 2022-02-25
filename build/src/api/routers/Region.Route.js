"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Region_Controller_1 = require("../controllers/Region.Controller");
const requireUser_1 = __importDefault(require("../middlewares/requireUser"));
const validateResource_1 = __importDefault(require("../middlewares/validateResource"));
const Region_Schema_1 = require("../schema/Region.Schema");
function regionRoutes(app) {
    app.post('/api/regions', [
        requireUser_1.default,
        (0, validateResource_1.default)(Region_Schema_1.CreateRegionSchema),
        Region_Controller_1.CreateRegionHandler,
    ]);
    app.put('/api/regions/:regionId', [
        requireUser_1.default,
        (0, validateResource_1.default)(Region_Schema_1.UpdateRegionSchema),
        Region_Controller_1.UpdateRegionHandler,
    ]);
    app.get('/api/regions', [
        requireUser_1.default,
        (0, validateResource_1.default)(Region_Schema_1.GetRegionSchema),
        Region_Controller_1.GetRegionHandler,
    ]);
    app.delete('/api/regions/:regionId', [
        requireUser_1.default,
        (0, validateResource_1.default)(Region_Schema_1.DeleteRegionSchema),
        Region_Controller_1.DeleteRegionHandler,
    ]);
}
exports.default = regionRoutes;
