import { InRequestScope, Inject } from "typescript-ioc";
import IGameMap from "../interface/GameMap";
import FizzBuzz from "../service/FizzBuzz";
import OddOrEven from "../service/OddOrEven";
import IGame from "../interface/Game";
@InRequestScope
export default class GameMap implements IGameMap {
    [gameName: string]:IGame<any>;

    constructor(@Inject FizzBuzz: FizzBuzz, @Inject OddOrEven: OddOrEven) {
        this.fizzbuzz = FizzBuzz;
        this.oddoreven = OddOrEven;
    }
}