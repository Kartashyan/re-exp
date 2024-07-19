import bcrypt from 'bcryptjs';
import { Password } from './password.value-object';

export class PasswordService {
    public hash(password: Password): string {
        debugger;
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password.value, salt);
    }

    public compare(password: Password, hash: string): boolean {
        return bcrypt.compareSync(password.value, hash);
    }
}