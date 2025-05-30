"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticationMiddleware = exports.RateLimiter = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const user_model_1 = require("../../features/user/model/user.model");
const authenticationMiddleware = async (req, res, next) => {
    var _a, _b;
    try {
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)
            return next();
        const authHeader = req.headers.authorization;
        let token;
        if (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }
        else if ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: "Not Authorized" });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await user_model_1.BaseUser.findById(decoded.id);
        if (!user) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: "User not found" });
            return;
        }
        req.user = user;
        req.user.password = "";
        next();
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: "Not Authorized", error: error });
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
exports.RateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 5 requests per windowMs
    message: "Too many requests from this IP, please try again after an 15 minutes",
    statusCode: http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const userRole = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userType) || '';
        if (allowedRoles.includes(userRole)) {
            return next();
        }
        return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message: "Forbidden: You do not have permission to access this resource." });
    };
};
exports.authorize = authorize;
