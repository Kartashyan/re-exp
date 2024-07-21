import { eq } from 'drizzle-orm';
import { HashedPassword } from "~/domain-contexts/core/hashed-password.value-object";
import { UID } from "~/domain-contexts/core/id";
import { db } from "~/infrastructure/storage/db";
import { usersTable } from "~/infrastructure/storage/schema";
import { Email } from "../domain/email.value-object";
import { UserRepository } from "../domain/user-repo.port";
import { User } from "../domain/user.aggregate-root";


export class UserLocalMemoryRepositoryAdapter implements UserRepository {
    private users: User[] = [];

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find((user) => user.email.value === email) || null;
    }

    async exists(email: string): Promise<boolean> {
        return !!this.users.find((user) => user.email.value === email);
    }
}

export class UserDrizzleRepositoryAdapter implements UserRepository {
    private db = db;
    async save(user: User): Promise<void> {
        await this.db.insert(usersTable).values({
            id: user.id.value,
            email: user.email.value,
            password: user.password.value,
        })
    }
    async findByEmail(email: string): Promise<User | null> {
        const users = await this.db.select().from(usersTable).where(eq(usersTable.email, email));
        if (!users.length) return null;
        const user = users[0];
        return User.create({
            email: Email.create(user.email),
            hashedPassword: new HashedPassword(user.password),
        }, new UID(user.id));
    }
    async exists(email: string): Promise<boolean> {
        const users = await this.db.select().from(usersTable).where(eq(usersTable.email, email));
        return !!users.length
    }
}