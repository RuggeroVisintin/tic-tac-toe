import { PlayerId } from "../Game";
import { GameRepository } from "../GameRepository";
import { Move } from "../Move";

export class MakeAMoveUseCase {
    constructor(
        private readonly gameRepository: GameRepository
    ) {}

    public execute(gameId: string, playerId: PlayerId, move: Move) {
        const game = this.gameRepository.readOne(gameId);

        game.nextMove(playerId, move);

        this.gameRepository.writeOne(game);

        return {
            board: game.board,
            isGameOver: game.winner !== -1,
            winner: game.winner
        };
    }
}