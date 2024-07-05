export abstract class AbstractRepository<T> {
    abstract readOne(...args: any[]): T;
    abstract writeOne(item: T): void;
}