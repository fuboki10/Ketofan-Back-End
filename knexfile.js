"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var config = require("config");
var DATE_OID = 1082;
var parseDate = function (value) { return value; };
pg_1.types.setTypeParser(DATE_OID, parseDate);
var knexConfig = {
    development: {
        client: 'pg',
        connection: process.env.DB || config.get('DB'),
        migrations: {
            directory: './db/migrations'
        },
        seeds: { directory: './db/seeds' },
        pool: { min: 0, max: 7 }
    },
    test: {
        client: 'pg',
        connection: process.env.DB || config.get('DB'),
        migrations: {
            directory: './db/migrations'
        },
        seeds: { directory: './db/seeds' },
        pool: { min: 0, max: 7 }
    },
    production: {
        client: 'pg',
        connection: process.env.DB || config.get('DB'),
        migrations: {
            directory: './db/migrations'
        },
        seeds: { directory: './db/seeds' },
        pool: { min: 0, max: 7 }
    }
};
exports["default"] = knexConfig;
