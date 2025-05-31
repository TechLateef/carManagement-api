import { CarService } from "../../src/features/car/service/car.service";
import { CreateCarDto } from "../../src/features/car/dto/create-car.dto";
import { jest } from "@jest/globals";
import { Response } from "express";

jest.mock("../../src/features/car/model/car.model", () => {
    function Car() {}
    Car.create = jest.fn();
    Car.findById = jest.fn();
    Car.findByIdAndUpdate = jest.fn();
    Car.findByIdAndDelete = jest.fn();
    Car.find = jest.fn();
    Car.countDocuments = jest.fn();
    Car.prototype.save = jest.fn(); 
    return { Car };
});

describe("CarService", () => {
    let carService: CarService;
    let res: Response;
    
    beforeEach(() => {
        carService = new CarService();
        res = {
                    cookie: jest.fn(),
                    set: jest.fn(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as unknown as Response;
    });

    describe("createCar", () => {
        it("should create a new car", async () => {
            const carData: CreateCarDto = {
                brand: "Toyota",
                model: "Corolla",
                price: 20000,
                year: 2020,
                category: "randomrIdUUId",
                available: true,
            };

            const createdCar = { ...carData, _id: "12345" };
            const { Car } = require("../../src/features/car/model/car.model");
            (Car.create as jest.Mock<any>).mockResolvedValue(createdCar);

            await carService.createCar(carData);

            expect(Car.create).toHaveBeenCalledWith(carData);
        });
    });

    describe("getCarById", () => {
        it("should return a car by ID", async () => {
            const carId = "12345";
            const foundCar = { _id: carId, brand: "Toyota", model: "Corolla" };
            const { Car } = require("../../src/features/car/model/car.model");
            (Car.findById as jest.Mock<any>).mockResolvedValue(foundCar);

            const result = await carService.getCarById(carId);
            expect(result).toEqual(foundCar);
            expect(Car.findById).toHaveBeenCalledWith(carId);
        });
    });
    describe("updateCar", () => {
        it("should update a car by ID", async () => {
            const carId = "12345";
            const updateData = { price: 21000 };
            const updatedCar = { _id: carId, ...updateData };
            const { Car } = require("../../src/features/car/model/car.model");
            (Car.findByIdAndUpdate as jest.Mock<any>).mockResolvedValue(updatedCar);

            const result = await carService.updateCar(carId, updateData);
            expect(result).toEqual(updatedCar);
            expect(Car.findByIdAndUpdate).toHaveBeenCalledWith(carId, updateData, { new: true });
        });
    }
    );
    describe("deleteCar", () => {
        it("should delete a car by ID", async () => {
            const carId = "12345";
            const { Car } = require("../../src/features/car/model/car.model");
            (Car.findByIdAndDelete as jest.Mock<any>).mockResolvedValue({ _id: carId });

            const result = await carService.deleteCar(carId);
            expect(result).toEqual({ _id: carId });
            expect(Car.findByIdAndDelete).toHaveBeenCalledWith(carId);
        });
    }
    );
    describe("getCars", () => {
        it("should return cars with filters and pagination", async () => {
            const filters = { brand: "Toyota", model: "Corolla", available: true, minPrice: '15000', maxPrice: '25000' };
            const foundCars = [{ _id: "12345", brand: "Toyota", model: "Corolla" }];
            const { Car } = require("../../src/features/car/model/car.model");
            const populateMock = jest.fn<any>().mockResolvedValue(foundCars);
            const limitMock = jest.fn().mockImplementation(() => ({
                populate: populateMock
            }));
            const skipMock = jest.fn().mockImplementation(() => ({
                limit: limitMock
            }));
            (Car.find as jest.Mock<any>).mockImplementation(() => ({
                skip: skipMock
            }));
            (Car.countDocuments as jest.Mock<any>).mockResolvedValue(foundCars.length);

            const result = await carService.getCars(filters);
            expect(result).toEqual({
                data: foundCars,
                limit: 10,
                page: 1,
                total: foundCars.length,
                totalPages: 1
            });
            expect(Car.find).toHaveBeenCalledWith(expect.objectContaining({
                brand: { $regex: new RegExp(`^${filters.brand}$`, 'i') },
                model: { $regex: new RegExp(`^${filters.model}$`, 'i') },
                available: true,
                price: { $gte: 15000, $lte: 25000 }
            }));
        });
    }
    );
});
