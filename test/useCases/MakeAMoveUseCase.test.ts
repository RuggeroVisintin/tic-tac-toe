import { Game } from "../../src/game/Game"
import { GameRepository } from "../../src/game/GameRepository"
import { Move } from "../../src/game/Move"
import { MakeAMoveUseCase } from "../../src/game/useCases/MakeAMoveUseCase"

describe('MakeAMoveUseCase', () => {
    let game: Game;
    let gameRepository: GameRepository;

    beforeEach(() => {
        game = new Game();
        gameRepository = new GameRepository();
        gameRepository.writeOne(game);
    })

    it('Should return the board of the given game with the given move applied', () => {
        const result = new MakeAMoveUseCase(gameRepository)
            .execute(game.uuid, 0, new Move(1, 1));
        
        expect(result.board).toEqual(game.board);
    });

    it('Should return the winner if any', () => {
        const result = new MakeAMoveUseCase(gameRepository)
            .execute(game.uuid, 0, new Move(1, 1));
        
        expect(result.winner).toEqual(-1);
    })

    it('Should return isGameOver status', () => {
        const result = new MakeAMoveUseCase(gameRepository)
            .execute(game.uuid, 0, new Move(1, 1));
        
        expect(result.isGameOver).toEqual(false);
    })

    it('Should persist the game with the new move applied', () => {
        jest.spyOn(gameRepository, 'writeOne');

        new MakeAMoveUseCase(gameRepository)
            .execute(game.uuid, 0, new Move(1, 1));
        
        expect(gameRepository.writeOne).toHaveBeenCalledWith(game);
    })
})