import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { UserModel } from "~/domain-contexts/user/domain/user.model";
import { userService } from "~/domain-contexts/user/user.service";
import { sessionStorage } from "./storage.server";

export const EMAIL_PASSWORD_STRATEGY = "email-password-strategy";

export const authenticator = new Authenticator<UserModel>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    const result = await userService.signin({email: String(email), password: String(password)});

    if (!result.success) {
      throw new Error(result.reason);
    }

    const user = result.value;

    return { email: user.email.value, id: user.id.value };
  }),
  EMAIL_PASSWORD_STRATEGY
);