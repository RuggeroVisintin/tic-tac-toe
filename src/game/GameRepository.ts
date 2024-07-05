import { AbstractRepository } from "../base/AbstractRepository";
import { NotFoundError } from "../errors";
import { Game } from "./Game";

export class GameRepository extends AbstractRepository<Game> {
    private _games = new Map<string, Game>();

    readOne(id: string): Game {
        const result = this._games.get(id);

        if (!result) {
            throw new NotFoundError('Cannot find the given Game');
        }

        return result!;
    }

    writeOne(game: Game): void {
        this._games.set(game.uuid, game);

        return;
    }
}