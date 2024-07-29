
import { DomainEvent } from "../core/domain-event";
import { Task } from "./task.aggregate";

export class TaskCreated implements DomainEvent<Task> {
    name = 'task-created';
    occuredAt = new Date();
    aggregate: Task;
    constructor(aggregate: Task) {
        this.aggregate = aggregate;
    }
}