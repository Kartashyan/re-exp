import { AggregateRoot } from "../core/aggregate-root";
import { UID } from "../core/id";
import { TaskCreated } from "./task-created.domain-event";
import { TaskStatus } from "./task-status.value-object";

type TaskProps = {
    id: UID;
    title: string;
    description: string;
    status: TaskStatus;
};

export class Task extends AggregateRoot<TaskProps> {
    private constructor(props: TaskProps) {
        super(props);
    }

    get title(): string {
        return this.props.title;
    }

    get description(): string {
        return this.props.description;
    }

    get status(): TaskStatus {
        return this.props.status;
    }

    markTaskAsDone(): void {
        this.props.status = TaskStatus.create('done');
    }

    public static create({ id, title, description, status }: TaskProps): Task {
        const task = new Task({ id, title, description, status });
        if (id.isNew) {
            task.addDomainEvent(new TaskCreated(task));
        }
        return task;
    }
}