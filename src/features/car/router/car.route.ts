import { Router } from 'express';
import { CarController } from '../controller/car.controller';
import { CarService } from '../service/car.service';

const router = Router();
const carService = new CarService();
const carController = new CarController(carService);

/**
 * @description Get a  cars by query parameters
 * @access protected
 * @route GET /api/v1/cars
 */
router.get('/', carController.getCars);

/**
 * @description Create a new car
 * @access protected
 * @route GET /api/v1/cars/
 */
router.post('/', carController.createCar);


export { router as carRouter };
