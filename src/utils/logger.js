"use strict";
exports.__esModule = true;
var winston = require("winston");
var config = require("config");
var enumerateErrorFormat = winston.format(function (info) {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
var transports = [
    new winston.transports.Console({
        stderrLevels: ['error']
    }),
];
var nodeEnv = process.env.NODE_ENV || config.get('NODE_ENV') || 'development';
var logger = winston.createLogger({
    level: nodeEnv === 'development' ? 'debug' : 'info',
    format: winston.format.combine(enumerateErrorFormat(), nodeEnv === 'development'
        ? winston.format.colorize()
        : winston.format.uncolorize(), winston.format.splat(), winston.format.printf(function (_a) {
        var level = _a.level, message = _a.message;
        return level + ": " + message;
    })),
    transports: transports
});
exports["default"] = logger;
