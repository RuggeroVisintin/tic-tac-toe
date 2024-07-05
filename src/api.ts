import express from 'express';
import { NotFoundError, ValidationError } from './errors';
import { GameRepository } from './game/GameRepository';
import { Move } from './game/Move';
import { NewGameUseCase } from './game/useCases';
import { MakeAMoveUseCase } from './game/useCases/MakeAMoveUseCase';
import { RetrieveExitstingGameUseCase } from './game/useCases/RetrieveExisitngGameUseCase';
const app = express()
const port = 3000;

const gameRepository = new GameRepository();

app.use(express.json())


const hanldeError = (err: any, res: any) => {
    if (err instanceof ValidationError) {
        res.status(400).send({
            message: err.toString()
        });
    }

    if (err instanceof NotFoundError) {
        res.status(404).send({
            message: err.toString()
        });
    }
}

// TODO: Catch exceptions to implement error handling

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/game', (req, res) => {
    res.json({
        data: {
            gameId: new NewGameUseCase(gameRepository).execute().uuid
        }
    })
})

// TODO - retrieve existing game from gameId
app.get('/game/:gameId', (req, res) => {
    try {
        const gameId = req.params.gameId;

        res.json({
            data: new RetrieveExitstingGameUseCase(gameRepository).execute(gameId)
        })
    } catch (err) {
        hanldeError(err, res);
    }
})

app.post('/game/:gameId/move', (req, res) => {
    try {
        const gameId = req.params.gameId;

        const {
            playerId,
            move
        } = req.body.data;

        res.json({
            data: new MakeAMoveUseCase(gameRepository).execute(
                gameId,
                playerId,
                new Move(move.x, move.y))
        })
    } catch (err) {
        hanldeError(err, res);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})