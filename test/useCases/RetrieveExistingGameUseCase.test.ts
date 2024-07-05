import { Game } from "../../src/game/Game";
import { GameRepository } from "../../src/game/GameRepository";
import { RetrieveExitstingGameUseCase } from "../../src/game/useCases/RetrieveExisitngGameUseCase";

const moveToWinOnTopLeftToBottomRightDiagonal = () => {
    return [
        ['O', 'X', 'O'],
        ['X', 'O', ''],
        ['X', '', '']
    ]
}

describe('RetrieveExitstingGameUseCase', () => {
    const game = Game.fromBoardSnapshot(moveToWinOnTopLeftToBottomRightDiagonal());

    const gameRepo = new GameRepository();
    gameRepo.writeOne(game);

    it('Should retrieve an existing game if found in the given repository', () => {
        const useCase = new RetrieveExitstingGameUseCase(
            gameRepo
        );

        const result = useCase.execute(game.uuid);

        expect(result).toBe(game);
    })
})