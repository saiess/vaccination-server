"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_Controller_1 = __importDefault(require("../controllers/User.Controller"));
function userRoutes(app) {
    app.get('/getall', (req, res) => {
        res.sendStatus(200);
    });
    app.post('/api/users', User_Controller_1.default);
}
exports.default = userRoutes;
