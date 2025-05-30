import { Car } from '../model/car.model';
import { CarQueryDto } from '../dto/car-query.dto';

interface CarFilters {
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  page?: number;
  limit?: number;
}

export class CarService {


    /**
     * @description Create a new car
     * @param data data to create a new car 
     * @returns 
     */
    async createCar(data: any) {
    const car = new Car(data);
    return await car.save();
  }

  /**
   * @description Get a car by ID
   * @param carId string Car ID to find the car
   * @returns 
   */
  async getCarById(carId: string) {
    return await Car.findById(carId);
  }

  /**
   * @description Update a car by ID
   * @param carId string Car ID to update the car
   * @param data  data to update the car
   * @returns 
   */
  async updateCar(carId: string, data: any) {
    return await Car.findByIdAndUpdate(carId, data, { new: true });
  }

  /**
   * @description Delete a car by ID
   * @param carId string Car ID to delete the car
   * @returns 
   */
  async deleteCar(carId: string) {
    return await Car.findByIdAndDelete(carId);
  }

    /**
     * @description Get cars with filters and pagination
     * @param filters Filters for the car search
     * @returns 
     */
  async getCars(filters: CarQueryDto) {
    const query: any = {};
    if (filters.brand) query.brand = filters.brand;
    if (filters.model) query.model = filters.model;
    if (filters.available !== undefined) query.available 
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice !== undefined) query.price.$lte = Number(filters.maxPrice);
    }

    const page = filters.page ? Number(filters.page) : 1;
    const limit = filters.limit ? Number(filters.limit) : 10;
    const skip = (page - 1) * limit;

    const cars = await Car.find(query).skip(skip).limit(limit);
    const total = await Car.countDocuments(query);

    return {
      data: cars,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
