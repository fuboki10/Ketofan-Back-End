"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable import/extensions */
var knex_1 = require("knex");
var knexfile_1 = require("../knexfile");
var logger_1 = require("../src/utils/logger");
// eslint-disable-next-line import/order
var config = require("config");
/**
 * @author Abdelrahman Tarek
 * @async
 * @function
 * @summary Create database if not exists
 */
function createDatabase() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var env, configOptions, dbName, knex, databaseExists;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    env = process.env.NODE_ENV || config.get('NODE_ENV') || 'development';
                    configOptions = knexfile_1["default"][env];
                    dbName = configOptions.connection.slice(configOptions.connection.lastIndexOf('/') + 1);
                    configOptions.connection = configOptions.connection.slice(0, configOptions.connection.lastIndexOf('/'));
                    knex = knex_1["default"](configOptions);
                    return [4 /*yield*/, knex.raw("SELECT EXISTS ( SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('" + dbName + "') )")];
                case 1:
                    databaseExists = _b.sent();
                    if (!!((_a = databaseExists === null || databaseExists === void 0 ? void 0 : databaseExists.rows[0]) === null || _a === void 0 ? void 0 : _a.exists)) return [3 /*break*/, 3];
                    // if not exists create one
                    return [4 /*yield*/, knex.raw('CREATE DATABASE ketofan')];
                case 2:
                    // if not exists create one
                    _b.sent();
                    logger_1["default"].info('CREATED KETOFAN DATABASE SUCCESSFULLY!!');
                    _b.label = 3;
                case 3: return [4 /*yield*/, knex.destroy()];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
createDatabase();
