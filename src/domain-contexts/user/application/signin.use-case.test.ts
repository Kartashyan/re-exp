import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SigninUseCase } from "./signin.use-case";
import { UserRepository } from "../domain/user-repo.port";
import { Password } from "~/contexts/core/password.value-object";
import { User } from "../domain/user.aggregate-root";
import { Email } from "../domain/email.value-object";
import { fail, ok } from "~/contexts/core/result";

describe("SigninUseCase", () => {
    let userRepo: UserRepository;
    let signinUseCase: SigninUseCase;

    beforeEach(() => {
        userRepo = {
            findByEmail: vi.fn(),
            save: vi.fn(),
            exists: vi.fn(),
        };
        signinUseCase = new SigninUseCase(userRepo);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should return a user model when valid email and password are provided", async () => {
        const email = "test@example.com";
        const password = "password";
        const hashedPassword = Password.create(password).hash();
        const user = User.create({ email: Email.create(email), hashedPassword });
        
        vi.spyOn(userRepo, "findByEmail").mockResolvedValue(user);
        user.comparePassword = vi.fn().mockReturnValue(true);
        
        const result = await signinUseCase.execute(email, password);
        
        expect(userRepo.findByEmail).toHaveBeenCalledWith(email);
        expect(user.comparePassword).toHaveBeenCalledWith(expect.any(Password));
        expect(result).toEqual(ok(user));
    });

    it("should return a failure result when user is not found", async () => {
        const email = "test@example.com";
        const password = "password";

        vi.spyOn(userRepo, "findByEmail").mockResolvedValue(null);

        const result = await signinUseCase.execute(email, password);

        expect(userRepo.findByEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual(fail("[signin.use-case]: User not found"));
    });

    it("should return a failure result when invalid email or password is provided", async () => {
        const email = "invalid";
        const password = "inv";

        const result = await signinUseCase.execute(email, password);

        expect(result).toEqual(fail("[signin.use-case]: Invalid email or password"));
    });

    it("should return a failure result when an error occurs", async () => {
        const email = "test@example.com";
        const password = "password";

        vi.spyOn(userRepo, "findByEmail").mockRejectedValue(new Error());

        const result = await signinUseCase.execute(email, password);

        expect(userRepo.findByEmail).toHaveBeenCalledWith(email);

        expect(result).toEqual(fail("[signin.use-case]: Internal server error"));
    });
});

