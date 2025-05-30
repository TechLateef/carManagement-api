"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("./auth/router/auth.route");
const car_route_1 = require("./car/router/car.route");
// import { Express } from 'express';
const routeRegister = (app) => {
    const basePrefix = '/api/v1';
    app.get('/', (req, res) => {
        res.send('Application is up and Running');
    });
    app.use(`${basePrefix}/auth`, auth_route_1.authRouter);
    app.use(`${basePrefix}/cars`, car_route_1.carRouter); // Register car routes
    // Catch All
    app.all("/", (req, res) => {
        return res.status(404).json({
            status: "fail",
            message: `Route: ${req.originalUrl} not found`,
        });
    });
};
exports.default = routeRegister;
