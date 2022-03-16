"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const deserializeUser_1 = __importDefault(require("../api/middlewares/deserializeUser"));
const User_Route_1 = __importDefault(require("../api/routers/User.Route"));
const Center_Route_1 = __importDefault(require("../api/routers/Center.Route"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use(deserializeUser_1.default);
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: config_1.default.get('origin'),
        credentials: true,
    }));
    (0, User_Route_1.default)(app);
    (0, Center_Route_1.default)(app);
    return app;
}
exports.default = createServer;
