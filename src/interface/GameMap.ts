import { InRequestScope } from "typescript-ioc";
import IGame from "./Game";

export default interface IGameMap {
    [gameName: string]: IGame<any>;
}