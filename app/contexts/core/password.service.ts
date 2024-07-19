import * as bcrypt from 'bcrypt';
import { Password } from './password.value-object';

export class PasswordService {
    public hash(password: Password): string {
        return bcrypt.hashSync(password.value, bcrypt.genSaltSync());
    }

    public compare(password: Password, hash: string): boolean {
        return bcrypt.compareSync(password.value, hash);
    }
}