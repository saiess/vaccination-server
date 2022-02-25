"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Session_Controller_1 = require("../controllers/Session.Controller");
const User_Controller_1 = __importDefault(require("../controllers/User.Controller"));
const requireUser_1 = __importDefault(require("../middlewares/requireUser"));
const validateResource_1 = __importDefault(require("../middlewares/validateResource"));
const Session_Schema_1 = __importDefault(require("../schema/Session.Schema"));
const User_Schema_1 = __importDefault(require("../schema/User.Schema"));
function userRoutes(app) {
    app.get('/getall', (req, res) => {
        res.sendStatus(200);
    });
    app.post('/api/users', (0, validateResource_1.default)(User_Schema_1.default), User_Controller_1.default);
    app.post('/api/sessions', (0, validateResource_1.default)(Session_Schema_1.default), Session_Controller_1.CreateSessionHandler);
    app.get('/api/sessions', requireUser_1.default, Session_Controller_1.GetUserSessionHandler);
    app.delete('/api/sessions', requireUser_1.default, Session_Controller_1.DeleteSessionHandler);
}
exports.default = userRoutes;
