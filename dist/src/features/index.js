"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("./auth/router/auth.route");
const car_route_1 = require("./car/router/car.route");
const category_route_1 = __importDefault(require("./category/router/category.route"));
const routeRegister = (app) => {
    const basePrefix = '/api/v1';
    app.get('/', (req, res) => {
        res.send('Application is up and Running');
    });
    app.use(`${basePrefix}/auth`, auth_route_1.authRouter);
    app.use(`${basePrefix}/cars`, car_route_1.carRouter);
    app.use(`${basePrefix}/categories`, category_route_1.default);
    // Catch All
    app.all("/", (req, res) => {
        return res.status(404).json({
            status: "fail",
            message: `Route: ${req.originalUrl} not found`,
        });
    });
};
exports.default = routeRegister;
