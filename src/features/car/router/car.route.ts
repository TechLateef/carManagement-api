import { Router } from 'express';
import { CarController } from '../controller/car.controller';
import { CarService } from '../service/car.service';
import { authenticationMiddleware, authorize } from '../../../common/middleware/middleware';

const router = Router();
const carService = new CarService();
const carController = new CarController(carService);


router.use(authenticationMiddleware,authorize('Manager') as any);
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

export { router as carRouter };
