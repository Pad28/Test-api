import "dotenv/config";
import { get } from "env-var";

export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    SSL_KEY: get("SSL_KEY").required().asString(),
    SSL_CERT: get("SSL_CERT").required().asString(),
}
