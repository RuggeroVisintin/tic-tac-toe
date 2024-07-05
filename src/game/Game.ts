import { v4 } from 'uuid';
import { InvalidMoveError, ValidationError } from '../errors';
import { Move } from './Move';

export type PlayerId = 0 | 1;
export type GameBoard = string[][];

const PlayerSymbols = ['X', 'O'];
const PlayerIdFromSymbol = (symbol: string): PlayerId | -1 => PlayerSymbols.indexOf(symbol) as PlayerId | -1;

export class Game {
    private _lastPlayerToMove: PlayerId;
    private _winner: PlayerId | -1 = -1;
    private _movesCount = 0;

    private _board: string[][] = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    public get board(): string[][] {
        // Clone to avoid encapsulation leaks
        return [...this._board];
    }

    public get winner(): PlayerId | -1 {
        return this._winner;
    }

    static fromBoardSnapshot(board: string[][]): Game {
        const game = new Game();
        game._board = board;
        game._winner = game.checkWin();


        const [xCount, oCount] = game._board.reduce<number[]>((result, currentRow) => {
            currentRow.forEach(item => {
                const playerId = PlayerIdFromSymbol(item)

                if (playerId !== -1) {
                    result[playerId]++;
                }
            })

            return result;
        }, [0, 0] as number[]);

        game._movesCount = xCount + oCount;

        if (xCount < oCount) game._lastPlayerToMove = 0;
        if (oCount < xCount) game._lastPlayerToMove = 1;

        return game;
    }

    static from(game: Game): Game {
        let result = new Game();

        Object.entries(game).forEach(([key, value]) => {
            (<Record<string, any>>result)[key] = value;
        })

        return result;
    }

    public constructor(public readonly uuid: string = v4()) {
    }

    public nextMove(playerId: PlayerId, move: Move): void {
        this.validateNextMove(playerId, move);

        this._board[move.y - 1][move.x - 1] = PlayerSymbols[playerId];
        this._lastPlayerToMove = playerId;

        this._movesCount++;
        this._winner = this.checkWin();
    }

    public isDraft(): boolean {
        return this.isGameOver() && this._winner === -1;
    }

    private isGameOver(): boolean {
        return this._winner !== -1 || this._movesCount === 9;
    }

    private validateNextMove(playerId: PlayerId, move: Move) {
        if (this.isGameOver()) {
            throw new InvalidMoveError('Cannot make new moves on a finished game');
        }

        if (playerId !== 0 && playerId !== 1) {
            throw new ValidationError(`PlayerId ${playerId} is not valid. Use either 0 or 1`);
        }

        if (this._lastPlayerToMove === playerId) {
            throw new InvalidMoveError('The same player cannot move more than once in a row')
        }

        if (this._board[move.y - 1][move.x - 1] !== '') {
            throw new InvalidMoveError(`Cell [${move.x}, ${move.y}] is already taken. Choose another cell`);
        }
    }

    private checkWin(): PlayerId | -1 {
        const board = this._board;

        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return PlayerIdFromSymbol(board[i][0]);
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return PlayerIdFromSymbol(board[0][i]);
            }
        }

        // Check diagonals
        if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return PlayerIdFromSymbol(board[0][0]);
        }
        if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return PlayerIdFromSymbol(board[0][2]);
        }

        return -1;
    }
}