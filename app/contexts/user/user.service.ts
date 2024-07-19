import { fail, ok, Result } from "../core/result";
import { SigninUseCase } from "./application/signin.use-case";
import { SignupUseCase } from "./application/signup.usecase";
import { UserRepository } from "./domain/user-repo.port";
import { User } from "./domain/user.aggregate-root";
import { UserLocalMemoryRepositoryAdapter } from "./infrastructure/user-repo.adapter";

export class UserService {
    private readonly userRepo: UserRepository;
    private readonly signupUseCase: SignupUseCase;
    private readonly signinUseCase: SigninUseCase;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
        this.signupUseCase = new SignupUseCase(this.userRepo);
        this.signinUseCase = new SigninUseCase(this.userRepo);
    }

    async findUserByEmail(email: string): Promise<Result<User>> {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            return fail("User not found");
        }
        return ok(user);
    }

    signup(command: { email: string, password: string }): Promise<Result<true>> {
        return this.signupUseCase.execute(command);
    }

    signin(command: { email: string, password: string }): Promise<Result<User>> {
        return this.signinUseCase.execute(command.email, command.password);
    }
}
const userRepo = new UserLocalMemoryRepositoryAdapter();
export const userService = new UserService(userRepo);
