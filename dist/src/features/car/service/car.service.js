"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const car_model_1 = require("../model/car.model");
class CarService {
    /**
     * @description Create a new car
     * @param data data to create a new car
     * @returns
     */
    async createCar(data) {
        const car = new car_model_1.Car(data);
        return await car.save();
    }
    /**
     * @description Get a car by ID
     * @param carId string Car ID to find the car
     * @returns
     */
    async getCarById(carId) {
        return await car_model_1.Car.findById(carId);
    }
    /**
     * @description Update a car by ID
     * @param carId string Car ID to update the car
     * @param data  data to update the car
     * @returns
     */
    async updateCar(carId, data) {
        return await car_model_1.Car.findByIdAndUpdate(carId, data, { new: true });
    }
    /**
     * @description Delete a car by ID
     * @param carId string Car ID to delete the car
     * @returns
     */
    async deleteCar(carId) {
        return await car_model_1.Car.findByIdAndDelete(carId);
    }
    /**
     * @description Get cars with filters and pagination
     * @param filters Filters for the car search
     * @returns
     */
    async getCars(filters) {
        const query = {};
        if (filters.brand) {
            query.brand = { $regex: new RegExp(`^${filters.brand}$`, 'i') };
        }
        if (filters.model) {
            query.model = { $regex: new RegExp(`^${filters.model}$`, 'i') };
        }
        if (filters.available !== undefined) {
            if (typeof filters.available === 'string') {
                query.available = filters.available === 'true';
            }
            else {
                query.available = filters.available;
            }
        }
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            query.price = {};
            if (filters.minPrice !== undefined)
                query.price.$gte = Number(filters.minPrice);
            if (filters.maxPrice !== undefined)
                query.price.$lte = Number(filters.maxPrice);
        }
        const page = filters.page ? Number(filters.page) : 1;
        const limit = filters.limit ? Number(filters.limit) : 10;
        const skip = (page - 1) * limit;
        const cars = await car_model_1.Car.find(query)
            .skip(skip)
            .limit(limit)
            .populate('category');
        const total = await car_model_1.Car.countDocuments(query);
        return {
            data: cars,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}
exports.CarService = CarService;
