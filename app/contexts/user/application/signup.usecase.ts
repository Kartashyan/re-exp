
import { fail, ok, Result } from "~/contexts/core/result";
import { Email } from "../domain/email.value-object";
import { UserRepository } from "../domain/user-repo.port";
import { DomainError } from "~/contexts/core/domain-error";
import { User } from "../domain/user.aggregate-root";
import { Password } from "~/contexts/core/password.value-object";


type CommandDto = {
    email: string;
    password: string;
}

export class SignupUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(command: CommandDto): Promise<Result<true>> {
        let email: Email;
        let password: Password;
        try {
            email = Email.create(command.email);
            password = Password.create(command.password);
        } catch (e) {
            const error = e as DomainError;
            return fail(error.message);
        }
        debugger;
        const isExist = await this.userRepo.exists(email.value);

        if (isExist) {
            return fail('User already exists');
        }
        const hashedPassword = password.hash();
        
        const user = User.create({
            email,
            hashedPassword,
        });

        await this.userRepo.save(user);

        return ok(true);
    }
}