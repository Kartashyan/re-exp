import { AggregateRoot } from "~/domain-contexts/core/aggregate-root";
import { Email } from "./email.value-object";
import { UserCreatedEvent } from "./user-created.event";
import { UID } from "~/domain-contexts/core/id";
import { Password } from "~/domain-contexts/core/password.value-object";
import { HashedPassword } from "~/domain-contexts/core/hashed-password.value-object";

interface UserProps {
    id: UID;
    email: Email;
    hashedPassword: HashedPassword;
}
export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps) {
        super(props);
    }
    public static create(props: UserProps): User {
        const user = new User(props);
        if (props.id.isNew) {
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
