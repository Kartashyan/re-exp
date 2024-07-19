import { DomainEvent } from "~/contexts/core/domain-event";
import { User } from "./user.aggregate-root";

export class UserCreatedEvent implements DomainEvent<User> {
    public readonly name = "user.created";
    public readonly occuredAt = new Date();
    public readonly aggregate: User;

    constructor(user: User) {
        this.aggregate = user;
    }
}
