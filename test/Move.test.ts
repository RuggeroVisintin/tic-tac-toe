import { Move } from "../src/game/Move";

describe('Move', () => {
    describe('constructor', () => {
        it('Should create a new move with the given coordinates', () => {
            const move = new Move(2, 3);

            expect(move.x).toEqual(2);
            expect(move.y).toEqual(3);
        });
        it.each([
            ['x', -1, 2],
            ['y', 3, 0]
        ])('Should throw a new Error when a "%s" is lower than 1', (_, x, y) => {
            expect(() => new Move(x, y)).toThrow();
        })
        it.each([
            ['x', 5, 2],
            ['y', 3, 10]
        ])('Should throw a new Error when a "%s" is greater than 3', (_, x, y) => {
            expect(() => new Move(x, y)).toThrow();
        })
    })
})