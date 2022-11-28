import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    client: 'pg',
    connection: {
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
    },
}));
