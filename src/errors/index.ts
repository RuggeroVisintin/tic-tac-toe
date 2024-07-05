export class ValidationError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class InvalidMoveError extends ValidationError {
    public constructor(message: string) {
        super(message);
        this.name = 'InvalidMoveError';
    }
}

export class NotFoundError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}