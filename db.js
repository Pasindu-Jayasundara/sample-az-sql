import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Connection } from "tedious";

const currentDir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(currentDir, ".env");

if (existsSync(envPath)) {
    const envFile = readFileSync(envPath, "utf8");

    envFile.split(/\r?\n/).forEach((line) => {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith("#")) {
            return;
        }

        const separatorIndex = trimmedLine.indexOf("=");

        if (separatorIndex === -1) {
            return;
        }

        const key = trimmedLine.slice(0, separatorIndex).trim();
        const value = trimmedLine.slice(separatorIndex + 1).trim();

        if (key && process.env[key] === undefined) {
            process.env[key] = value.replace(/^["']|["']$/g, "");
        }
    });
}

const getRequiredEnv = (key) => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}. Create a .env file from .env.example.`);
    }

    return value;
};

const config = {
    server: getRequiredEnv("AZURE_SQL_SERVER"),
    authentication: {
        type: "default",
        options: {
            userName: getRequiredEnv("AZURE_SQL_USER"),
            password: getRequiredEnv("AZURE_SQL_PASSWORD")
        }
    },
    options: {
        encrypt: true,
        database: getRequiredEnv("AZURE_SQL_DATABASE")
    }
};

const con = new Connection(config);

export default con;
