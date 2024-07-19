import { UID } from "./id";

export class Entity<T> {
    protected readonly _id: UID
    constructor(private readonly _props: T, id?: UID) {
        this._props = _props;
        this._id = id ? id : new UID();
    }

    get id(): UID {
        return this._id;
    }

    get props(): T {
        return Object.freeze(this._props);
    }

    public equals(entity?: Entity<T>): boolean {
        if (entity === null || entity === undefined) {
            return false;
        }
        if (entity.id === null || entity.id === undefined) {
            return false;
        }

        if (typeof this._props !== 'object' || typeof entity._props !== 'object') {
            return false;
        }

        return this.id.equals(entity.id);
    }
}