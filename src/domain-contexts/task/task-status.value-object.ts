import { ValueObject } from "../core/value-object";

export class TaskStatus extends ValueObject<string> {
    private static readonly VALID_STATUSES = ['todo', 'in-progress', 'done'];

    private constructor(_status: string) {
        super(_status);
    }

    get status(): string {
        return this.props;
    }

    public static create(status: string): TaskStatus {
        if (!TaskStatus.VALID_STATUSES.includes(status)) {
            throw new Error('Invalid status');
        }

        return new TaskStatus(status);
    }
}