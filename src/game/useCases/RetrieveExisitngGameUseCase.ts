import { Game } from "../Game";
import { GameRepository } from "../GameRepository";

export class RetrieveExitstingGameUseCase {
    constructor(
        private readonly gameRepository: GameRepository
    ) { }

    public execute(gameId: string): Game {
        // TODO -- fetch game from gameRepo;
        return this.gameRepository.readOne(gameId);
    }
}