"use strict";

export default interface IGame<T> {
    Play(n: number, targetMessages?: {[key:string]: string}): T;
}
  