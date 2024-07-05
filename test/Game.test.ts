import { Game, PlayerId } from "../src/game/Game";
import { Move } from "../src/game/Move";

const moveToWinOnTopLeftToBottomRightDiagonal = () => {
    return [
        ['O', 'X', 'O'],
        ['X', 'O', ''],
        ['X', '', '']
    ]
}

const moveToWinOnTopRow = () => {
    return [
        ['O', '', 'O'],
        ['X', 'O', 'X'],
        ['X', '', '']
    ]
}

const moveToWinOnFirstColumn = () => {
    return [
        ['O', 'X', 'O'],
        ['', '', 'X'],
        ['O', '', 'X']
    ]
}

const moveToWinOnBottomLeftTopRightDiagonal = () => {
    return [
        ['O', 'X', 'O'],
        ['', '', 'X'],
        ['O', '', 'X']
    ]
}

const finishedGameWonOnFirstRow = () => {
    return [
        ['O', 'O', 'O'],
        ['X', 'O', 'X'],
        ['X', '', '']
    ]
}

const draftGame = () => {
    return [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', 'X']
    ]
}

const player1Turn = () => {
    return [
        ['X', 'O', 'X'],
        ['X', '', 'O'],
        ['O', 'X', '']
    ]
}

describe('Game', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    })

    describe('constructor', () => {

        it('Should construct a new Game with a unique id', () => {
            expect(game.uuid).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        })

        it('Should have start with a set of empty moves', () => {
            expect(game.board).toEqual([
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]);
        });

        it('Should start the game with no winner set', () => {
            expect(game.winner).toEqual(-1);
        })
    })

    describe('.nextMove()', () => {
        it('Should add the move to the list of moves of a given player', () => {
            const move = new Move(3, 2)
            game.nextMove(1, move);

            expect(game.board).toEqual([
                ['', '', ''],
                ['', '', 'O'],
                ['', '', '']
            ]);
        })

        it('Should throw if the same player moves more than once in a row', () => {
            const move = new Move(3, 2);
            const secondMove = new Move(3, 3);

            game.nextMove(1, move);

            expect(() => game.nextMove(1, secondMove))
                .toThrow('The same player cannot move more than once in a row');
        });

        it('Should throw if a move targets a cell that is already taken', () => {
            const move = new Move(3, 2);

            game.nextMove(0, move);

            expect(() => game.nextMove(1, move))
                .toThrow('Cell [3, 2] is already taken. Choose another cell');
        });

        it('Should throw if the playerId is not valid', () => {
            const move = new Move(3, 2);

            expect(() => game.nextMove(2 as PlayerId, move))
                .toThrow('PlayerId 2 is not valid. Use either 0 or 1');
        })

        it.each([
            [finishedGameWonOnFirstRow()],
            [draftGame()]
        ])('Should throw if the game is over', (board) => {
            const game = Game.fromBoardSnapshot(board);

            expect(() => game.nextMove(0, new Move(3, 3)))
                .toThrow('Cannot make new moves on a finished game');
        })

        it('Should allow the same player to retry if the previous move was not valid and the game is not over', () => {
            const move = new Move(3, 2);

            game.nextMove(0, move);

            try {
                game.nextMove(1, move);
            } catch (err) {
                expect(() => game.nextMove(1, new Move(2, 2))).not.toThrow();
            }
        })

        it.each([
            [moveToWinOnTopLeftToBottomRightDiagonal(), new Move(3, 3)],
            [moveToWinOnTopRow(), new Move(2, 1)],
            [moveToWinOnFirstColumn(), new Move(1, 2)],
            [moveToWinOnBottomLeftTopRightDiagonal(), new Move(2, 2)]
        ])('Should assign the win to the winning player when three symbols on a row are found', (board, nextMove: Move) => {
            game = Game.fromBoardSnapshot(board);

            game.nextMove(1, nextMove);

            expect(game.winner).toEqual(1);
        })

    })

    describe('isDraft', () => {
        it('Should return true if the game ended with a draft', () => {
            const game = Game.fromBoardSnapshot(draftGame());

            expect(game.isDraft()).toBe(true);
        })

        it('Should return false if the game is not ended', () => {
            const game = Game.fromBoardSnapshot(moveToWinOnBottomLeftTopRightDiagonal());

            expect(game.isDraft()).toBe(false);
        })

        it('Should return false if the game ended with a winner', () => {
            const game = Game.fromBoardSnapshot(finishedGameWonOnFirstRow());

            expect(game.isDraft()).toBe(false);
        })
    })

    describe('.fromBoardSnapshot()', () => {
        it('Should initialize a new game from a board snapshot', () => {
            const board = moveToWinOnTopLeftToBottomRightDiagonal();

            const game = Game.fromBoardSnapshot(board);

            expect(game.board).toEqual(board);
        })

        it('Should correctly set the starting player based on the given snapshot', () => {
            const game = Game.fromBoardSnapshot(player1Turn())

            expect(() => game.nextMove(1, new Move(3, 3))).toThrow('The same player cannot move more than once in a row')
        });

        it('Should set the winner based on the given snapshot', () => {
            const game = Game.fromBoardSnapshot(finishedGameWonOnFirstRow());

            expect(game.winner).toBe(1);
        })
    })
})