# Tic Tac Toe

## Requirements

Node 20

## How to run

`npm start` will start the api server on localhost:3000, from there you have a couple of APIs you can use.

`POST /game` to create a new Game. The API will return the game id back

`POST /game/:gameId/move` to make a new move. The API will validate the move against the rules and return back a board representation.

The required body structure needs to meet the following example

```
{
    "data": {
        "playerId": 0,
        "move": {
            "x": 1,
            "y": 1
        }
    }
}
```

## Useful commands

`npm i` to install the packages
`npm run test` to run the whole test suite
