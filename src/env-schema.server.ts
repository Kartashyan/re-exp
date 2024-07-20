import z from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.string().default('3000'),
    SESSION_SECRET: z.string().trim().min(2),
});

export type EnvServer = z.infer<typeof envSchema>;

const env = envSchema.safeParse(process.env);


if (!env.success) {
    console.error(env.error.issues);
    throw new Error('There is an error with the server environment variables');
}

export const envServerSchema = env.data;