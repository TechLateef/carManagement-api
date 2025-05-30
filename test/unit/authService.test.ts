//Unit test for authService for signUp and login methods
import { AuthService } from "../../src/features/auth/service/auth.service";
import { UsersService } from "../../src/features/user/service/user.service";
import { CreateUserDto } from "../../src/features/auth/dto/createUser.dto";

import { LoginDto } from "../../src/features/auth/dto/login.dto";
import { Response } from "express";
import { jest } from "@jest/globals";
import { encrypt } from "../../src/common/utils/encrypt";

jest.mock("../../src/features/customer/model/customer.model", () => ({
  Customer: { create: jest.fn() }
}));
jest.mock("../../src/features/manager/model/manager.model", () => ({
  Manager: { create: jest.fn() }
}));

describe("AuthService", () => {
    let authService: AuthService;
    let usersService: UsersService;
    let res: Response;

    beforeEach(() => {
        usersService = new UsersService();
        authService = new AuthService(usersService);
        res = {
            cookie: jest.fn(),
            set: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
    });

    describe("signUp", () => {
        it("should create a new user and send a token", async () => {
            const userDetails: CreateUserDto = {
                email: "test@test.com",
                password: "password123",
                userType: "Customer",
                fullName: "Test User",
                phoneNumber: "1234567890",
            };

            // Use 'any' for createdUser to avoid TS 'never' error
            const createdUser: any = { ...userDetails, _doc: userDetails, password: undefined };

            jest.spyOn(usersService, "findByEmail").mockResolvedValue(null);
            jest.spyOn(authService, "createAndSendToken").mockResolvedValue("mockToken");

            // Mock Customer.create for discriminator usage
            const { Customer } = require("../../src/features/customer/model/customer.model");
            (Customer.create as jest.Mock<any>).mockResolvedValue(createdUser);

            await authService.signUp(userDetails, res);

            expect(usersService.findByEmail).toHaveBeenCalledWith("test@test.com");
            expect(authService.createAndSendToken).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'User created successfully',
                token: "mockToken",
                user: expect.any(Object),
            }));

            await new Promise(resolve => setImmediate(resolve));
        }, 30000); 
        it("should return 400 if email already exists", async () => {
            const userDetails: CreateUserDto = {
                email: "test@test.com",
                password: "password123",
                userType: "Customer",
                fullName: "Test User",
                phoneNumber: "1234567890",
            };

            jest.spyOn(usersService, "findByEmail").mockResolvedValue(userDetails as any);

            await authService.signUp(userDetails, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'The provided email has already been taken.' });
        });
    });

    describe("login", () => {
        it("should login user and send a token", async () => {
            const loginDetails: LoginDto = {
                email: "test@test.com",
                password: "password123",
            };

            const user = {
                _doc: { email: "test@test.com" },
                comparePassword: jest.fn(async (_: string) => true),
            };

            jest.spyOn(usersService, "findByEmail").mockResolvedValue(user as any);
            jest.spyOn(authService, "createAndSendToken").mockResolvedValue("mockToken");

            await authService.login(loginDetails, res);

            expect(usersService.findByEmail).toHaveBeenCalledWith("test@test.com");
            expect(user.comparePassword).toHaveBeenCalledWith("password123");
            expect(authService.createAndSendToken).toHaveBeenCalledWith(user, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Login successful',
                token: "mockToken",
                user: expect.any(Object),
            }));
        });

        it("should return 404 if user not found", async () => {
            const loginDetails: LoginDto = {
                email: "test@test.com",
                password: "password123",
            };

            jest.spyOn(usersService, "findByEmail").mockResolvedValue(null);

            await authService.login(loginDetails, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });

        it("should return 401 if password does not match", async () => {
            const loginDetails: LoginDto = {
                email: "test@test.com",
                password: "wrongpassword",
            };

            const user = {
                comparePassword: jest.fn(async (_: string) => false),
            };

            jest.spyOn(usersService, "findByEmail").mockResolvedValue(user as any);

            await authService.login(loginDetails, res);

            expect(user.comparePassword).toHaveBeenCalledWith("wrongpassword");
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });
    });
});
