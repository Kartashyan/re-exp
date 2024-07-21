import type { Config } from 'drizzle-kit';
import path from 'node:path';

export default {
    schema: path.join(__dirname, './src/infrastructure/storage/schema.ts'),
    out: path.join(__dirname, './src/infrastructure/storage/drizzle'),
    dialect: 'sqlite',
    dbCredentials: {
        url: path.join(__dirname, './src/infrastructure/storage/sqlite.db'),
    },

} satisfies Config;