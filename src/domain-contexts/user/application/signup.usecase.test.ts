import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UserRepository } from "../domain/user-repo.port";
import { SignupUseCase } from "./signup.usecase";
import { fail, ok } from "~/domain-contexts/core/result";

describe("SignupUseCase", () => {
  let userRepo: UserRepository;
  let signupUseCase: SignupUseCase;

  beforeEach(() => {
    userRepo = {
      exists: vi.fn(),
      save: vi.fn(),
      findByEmail: vi.fn(),
    };
    signupUseCase = new SignupUseCase(userRepo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new user when valid email and password are provided", async () => {
    // Arrange
    const command = {
      email: "test@example.com",
      password: "password123",
    };

    vi.spyOn(userRepo, "exists").mockResolvedValue(false);

    // Act
    const result = await signupUseCase.execute(command);

    // Assert
    expect(result).toEqual(ok(true));
  });

  it("should return an error when email or password is invalid", async () => {
    // Arrange
    const command = {
      email: "invalid-email",
      password: "short",
    };

    // Act
    const result = await signupUseCase.execute(command);

    // Assert
    expect(result).toEqual(fail("Invalid email"));
  });

  it("should return an error when email or password is invalid", async () => {
    // Arrange
    const command = {
      email: "valid@email.com",
      password: "short",
    };

    // Act
    const result = await signupUseCase.execute(command);

    // Assert
    expect(result).toEqual(fail("Invalid password"));
  });

  it("should return an error when user already exists", async () => {
    // Arrange
    const command = {
      email: "existing-user@example.com",
      password: "password123",
    };

    vi.spyOn(userRepo, "exists").mockResolvedValue(true);

    // Act
    const result = await signupUseCase.execute(command);

    // Assert
    expect(userRepo.exists).toHaveBeenCalledWith(command.email);
    expect(result).toEqual(fail("User already exists"));
  });
});