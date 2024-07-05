import { InvalidMoveError } from "../errors";

export class Move {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) { 
        this.validateCoordinate(x);
        this.validateCoordinate(y);
    }
    
    private validateCoordinate(coordinate: number) {
        if (coordinate < 1) {
            throw new InvalidMoveError('Invalid Cooridnate: make sure to use coordinates between 1 and 3');
        }

        if (coordinate > 3) {
            throw new InvalidMoveError('Invalid Cooridnate: make sure to use coordinates between 1 and 3');
        }
    }
}