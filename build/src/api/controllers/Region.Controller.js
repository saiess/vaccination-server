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
exports.DeleteRegionHandler = exports.GetRegionHandler = exports.UpdateRegionHandler = exports.CreateRegionHandler = void 0;
const Region_Service_1 = require("../services/Region.Service");
function CreateRegionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const { body } = req;
        const region = yield (0, Region_Service_1.CreatRegion)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(region);
    });
}
exports.CreateRegionHandler = CreateRegionHandler;
function UpdateRegionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const regionId = req.params.RegionId;
        const update = req.body;
        const region = yield (0, Region_Service_1.FindRegion)({ regionId });
        if (!region) {
            return res.sendStatus(404);
        }
        if (region.user !== userId) {
            return res.sendStatus(403);
        }
        const updatedRegion = yield (0, Region_Service_1.FindAndUpdateRegion)({ regionId }, update, {
            new: true,
        });
        return res.send(updatedRegion);
    });
}
exports.UpdateRegionHandler = UpdateRegionHandler;
function GetRegionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const regionId = req.params.RegionId;
        const region = yield (0, Region_Service_1.FindRegion)({ regionId });
        if (!region) {
            return res.sendStatus(404);
        }
        return res.send(region);
    });
}
exports.GetRegionHandler = GetRegionHandler;
function DeleteRegionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const regionId = req.params.RegionId;
        const region = yield (0, Region_Service_1.FindRegion)({ regionId });
        if (!region) {
            return res.sendStatus(404);
        }
        if (region.user !== userId) {
            return res.sendStatus(403);
        }
        yield (0, Region_Service_1.DeleteRegion)({ regionId });
        return res.sendStatus(200);
    });
}
exports.DeleteRegionHandler = DeleteRegionHandler;
