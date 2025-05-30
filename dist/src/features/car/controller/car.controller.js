"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
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
                res.status(201).json(car);
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
                const car = await this.carService.getCarById(req.params.id);
                if (!car)
                    return res.status(404).json({ message: 'Car not found' });
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
                const car = await this.carService.updateCar(req.params.id, req.body);
                if (!car)
                    return res.status(404).json({ message: 'Car not found' });
                res.json(car);
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
                const car = await this.carService.deleteCar(req.params.id);
                if (!car)
                    return res.status(404).json({ message: 'Car not found' });
                res.status(204).send();
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
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CarController = CarController;
