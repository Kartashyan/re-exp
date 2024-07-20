import { AggregateRoot } from "~/contexts/core/aggregate-root";
import { Email } from "./email.value-object";
import { UserCreatedEvent } from "./user-created.event";
import { UID } from "~/contexts/core/id";
import { Password } from "~/contexts/core/password.value-object";
import { HashedPassword } from "~/contexts/core/hashed-password.value-object";

interface UserProps {
    email: Email;
    hashedPassword: HashedPassword;
}
export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: UID) {
        super(props, id);
    }
    public static create(props: UserProps, id?: UID): User {
        const isNew = id ? false : true;
        const user = new User(props, id);
        if (isNew) {
            user.addDomainEvent(new UserCreatedEvent(user));
        }
        return user;
    }

    get email(): Email {
        return this.props.email;
    }

    get password(): HashedPassword {
        return this.props.hashedPassword;
    }

    comparePassword(password: Password): boolean {
        return this.props.hashedPassword.compare(password);
    }
}
