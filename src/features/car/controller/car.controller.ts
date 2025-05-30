import { Request, Response, NextFunction } from 'express';
import { CarService } from '../service/car.service';
import { CarQueryDto } from '../dto/car-query.dto';

export class CarController {
  constructor(private readonly carService: CarService) {}

    /**
     * @description Create a new car
     * @access protected
     * @param req express Request object 
     * @param res express Response object
     * @param next express NextFunction for error handling
     */
  createCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await this.carService.createCar(req.body);
      res.status(201).json(car);
    } catch (error) {
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
  getCarById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await this.carService.getCarById(req.params.id);
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.json(car);
    } catch (error) {
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
  updateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await this.carService.updateCar(req.params.id, req.body);
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.json(car);
    } catch (error) {
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
  deleteCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await this.carService.deleteCar(req.params.id);
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.status(204).send();
    } catch (error) {
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
  getCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = req.query as unknown as CarQueryDto;
      const result = await this.carService.getCars(filters);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
