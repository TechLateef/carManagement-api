"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
class CarController {
    constructor(carService) {
        this.carService = carService;
        /**
         * @description Create a new car
         * @access protected
         * @param req express Request object
         * @param res express Response object
         * @param next express NextFunction for error handling
         */
        this.createCar = async (req, res, next) => {
            try {
                const car = await this.carService.createCar(req.body);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Car as been  created', car });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * @description Get a car by ID
         * @access protected
         * @param req express Request object
         * @param res express Response object
         * @param next express NextFunction for error handling
         * @returns
         */
        this.getCarById = async (req, res, next) => {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Invalid car ID format' });
                }
                const car = await this.carService.getCarById(req.params.id);
                if (!car)
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Car not found' });
                res.json(car);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * @description Update a car by ID
         * @access protected
         * @param req express Request object
         * @param res express Response object
         * @param next express NextFunction for error handling
         * @returns
         */
        this.updateCar = async (req, res, next) => {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Invalid car ID format' });
                    return;
                }
                const car = await this.carService.updateCar(req.params.id, req.body);
                console.log(car);
                if (!car) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Car not found' });
                    return;
                }
                res.status(http_status_codes_1.StatusCodes.OK).json(car);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * @description Delete a car by ID
         * @access protected
         * @param req express Request object
         * @param res express Response object
         * @param next express NextFunction for error handling
         * @returns
         */
        this.deleteCar = async (req, res, next) => {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Invalid car ID format' });
                    return;
                }
                const car = await this.carService.deleteCar(req.params.id);
                if (!car) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Car not found' });
                    return;
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Car deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * @description Get cars with filters and pagination
         * @access public
         * @param req express Request object
         * @param res express Response object
         * @param next express NextFunction for error handling
         */
        this.getCars = async (req, res, next) => {
            try {
                const filters = req.query;
                const result = await this.carService.getCars(filters);
                res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CarController = CarController;
