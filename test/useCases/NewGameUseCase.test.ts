import { Game } from "../../src/game/Game"
import { GameRepository } from "../../src/game/GameRepository"
import { NewGameUseCase } from "../../src/game/useCases"

describe('NewGameUseCase', () => {
    it('Should create a new game and return it', () => {
        expect(new NewGameUseCase(
            new GameRepository()
        ).execute()).toBeInstanceOf(Game);
    })

    it('Should save the new Game in the given repository', () => {
        const repository = new GameRepository();

        jest.spyOn(repository, 'writeOne');

        new NewGameUseCase(
            repository
        ).execute();

        expect(repository.writeOne).toHaveBeenCalledWith(expect.any(Game));
    })
})