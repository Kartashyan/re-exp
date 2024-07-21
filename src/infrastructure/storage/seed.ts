
import { db } from "./db";
import { usersTable } from "./schema";

async function seed() {
    await db.insert(usersTable).values([
        { id: "asdas12312312sdfsdfs", email: 'test@test.test', password: 'test' },
    ]);
}

seed().then(() => {
    console.log('Seed completed');
    process.exit(0);
}).catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});