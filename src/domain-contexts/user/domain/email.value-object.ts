import { DomainError } from "~/domain-contexts/core/domain-error";
import { ValueObject } from "~/domain-contexts/core/value-object";

export class Email extends ValueObject<string> {
    private constructor(props: string) {
        super(props);
    }

    public static create(email: string): Email {
        if (!Email.validate(email)) {
            throw new DomainError('Invalid email');
        }

        return new Email(email);
    }

    private static validate(email: string): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    get value() {
        return this.props;
    }
}