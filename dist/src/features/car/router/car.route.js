"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = require("express");
const car_controller_1 = require("../controller/car.controller");
const car_service_1 = require("../service/car.service");
const middleware_1 = require("../../../common/middleware/middleware");
const router = (0, express_1.Router)();
exports.carRouter = router;
const carService = new car_service_1.CarService();
const carController = new car_controller_1.CarController(carService);
router.use(middleware_1.authenticationMiddleware, (0, middleware_1.authorize)('Manager'));
/**
 * @description Get cars by query parameters
 * @access protected
 * @route GET /api/v1/cars
 */
router.get('/', carController.getCars);
/**
 * @description Create a new car
 * @access protected
 * @route POST /api/v1/cars/
 */
router.post('/', carController.createCar);
/**
 * @description Update a car by ID
 * @access protected
 * @route PATCH /api/v1/cars/:id
 */
router.patch('/:id', carController.updateCar);
/**
 * @description Delete a car by ID
 * @access protected
 * @route DELETE /api/v1/cars/:id
 */
router.delete('/:id', carController.deleteCar);
