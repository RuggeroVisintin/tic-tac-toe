import { Game } from "../src/game/Game";
import { GameRepository } from "../src/game/GameRepository";
import { Move } from "../src/game/Move";

describe('GameRepository', () => {
    let repository: GameRepository;
    let game: Game;

    beforeEach(() => {
        repository = new GameRepository();
        game = new Game();
    })

 

    describe('.readOne()', () => {
        it('Should read a game from a given uuid', () => {
            repository.writeOne(game);

            expect(repository.readOne(game.uuid)).toBeDefined();
        })

        it('Should throw a NotFoundError if the game is not found', () => {
            expect(() => repository.readOne(new Game().uuid))
                .toThrow('Cannot find the given Game')
        })
    })

    describe('.writeOne()', () => {
        it('Should save a new game', () => {
            repository.writeOne(game);

            expect(repository.readOne(game.uuid)).toEqual(game);
        })

        it('Should update an existing game', () => {
            repository.writeOne(game);

            const gameClone = Game.from(game);
            gameClone.nextMove(1, new Move(3, 3));

            repository.writeOne(gameClone);

            expect(repository.readOne(game.uuid)).toEqual(gameClone);
        })
    })
})