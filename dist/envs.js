"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").required().asPortNumber(),
    SSL_KEY: (0, env_var_1.get)("SSL_KEY").required().asString(),
    SSL_CERT: (0, env_var_1.get)("SSL_CERT").required().asString(),
};
