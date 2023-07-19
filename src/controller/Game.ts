"use strict";
import { Router, Request, Response } from 'express';
import { InRequestScope, Inject } from 'typescript-ioc';
import GameMap from '../model/GameMap';

@InRequestScope
export default class GameController {
	router: Router;
    games: GameMap;

	constructor(@Inject games: GameMap) {
		this.router = Router();
        this.games = games
	}

    public Router = () => {
		this.router.get('/', this.IndexAction);
        this.router.get("/:game", this.PlayAction);
        
		return this.router;
	}

	public IndexAction = (req: Request, res: Response) => {
        return res
            .status(200)
            .send("Hello World from the Game Controller!");
    }
    public PlayAction = (req: Request, res: Response) => {
        const { game } = req.params;
        const selectedGame = this.games[game.toLowerCase()];
    
        if (!selectedGame) {
            return res
                .status(404)
                .send("Game not found!");
        }
    
        const n = Number(req.query.n) || 100;
    
        return res
            .status(200)
            .send(selectedGame.Play(n));
    }
}
