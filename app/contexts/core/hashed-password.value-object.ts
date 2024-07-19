import { DomainError } from "./domain-error";
import { PasswordService } from "./password.service.server";
import { Password } from "./password.value-object";
import { ValueObject } from "./value-object";


export class HashedPassword extends ValueObject<string> {
    private passwordService: PasswordService;
    constructor(value: string) {
        super(value);
        this.passwordService = new PasswordService();
        if (!this.isValid()) {
            throw new DomainError('Invalid hashed password');
        }
    }

    get value(): string {
        return this.props;
    }

    public compare(password: Password): boolean {
        return this.passwordService.compare(password, this.props);
    }

    isValid(): boolean {
        const hashLength = 60; // bcrypt hash length
        if (this.props.length !== hashLength) {
            return false;
        }
        return true;
    }
}