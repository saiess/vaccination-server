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
exports.DeleteCenterHandler = exports.GetAllCentersHandler = exports.GetCenterHandler = exports.UpdateCenterHandler = exports.CreateCenterHandler = void 0;
const Center_Service_1 = require("../services/Center.Service");
// ** create center handler ***
function CreateCenterHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const { body } = req;
        const center = yield (0, Center_Service_1.CreatCenter)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(center);
    });
}
exports.CreateCenterHandler = CreateCenterHandler;
// ** update center handler ***
function UpdateCenterHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const { centerId } = req.params;
        const update = req.body;
        const center = yield (0, Center_Service_1.FindCenterById)(centerId);
        if (!center) {
            return res.sendStatus(404);
        }
        if (String(center.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedCenter = yield (0, Center_Service_1.FindAndUpdateCenter)(centerId, update, {
            new: true,
        });
        return res.send(updatedCenter);
    });
}
exports.UpdateCenterHandler = UpdateCenterHandler;
// ** get one center handler ***
function GetCenterHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { centerId } = req.params;
        const center = yield (0, Center_Service_1.FindCenterById)(centerId);
        console.log(center);
        if (!center) {
            return res.sendStatus(404);
        }
        return res.send(center);
    });
}
exports.GetCenterHandler = GetCenterHandler;
// ** get all centerq handler ***
function GetAllCentersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const center = yield (0, Center_Service_1.FindCenter)();
        console.log(center);
        if (!center) {
            return res.sendStatus(404);
        }
        return res.send(center);
    });
}
exports.GetAllCentersHandler = GetAllCentersHandler;
// ** delete a center handler ***
function DeleteCenterHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const { centerId } = req.params;
        const center = yield (0, Center_Service_1.FindCenterById)(centerId);
        if (!center) {
            return res.sendStatus(404);
        }
        if (String(center.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, Center_Service_1.DeleteCenter)(centerId);
        return res.sendStatus(200);
    });
}
exports.DeleteCenterHandler = DeleteCenterHandler;
