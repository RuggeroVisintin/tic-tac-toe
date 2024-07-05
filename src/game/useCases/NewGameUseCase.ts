import { Game } from "../Game";
import { GameRepository } from "../GameRepository";

export class NewGameUseCase {
    constructor(
        private readonly gameRepository: GameRepository
    ) {}

    public execute(): Game {
        const result = new Game();

        this.gameRepository.writeOne(result);
        return result;
    }
}