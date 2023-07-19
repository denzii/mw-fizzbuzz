"use strict";
import { InRequestScope } from "typescript-ioc";
import IGame from "../interface/Game";
import { OddOrEvenResult } from "../interface/GameResult";

@InRequestScope
export default class OddOrEven implements IGame<OddOrEvenResult> {
    Play(n: number): any {
        // 1. declare an array from 1 to n
        // 2. map each declaration to odd or even
        // 3. count the occurrences of each one
        const x = Array.from<number,number>({ length: n }, (_, index) => index++)
        .map((n: number) =>  n % 2 === 0 ? "Even": "Odd");

        return {
            Odd: {
                count: x.filter((m?: string) => String(m) === "Odd").length,
                message: "Odd"
            },
            Even: {
                count: x.filter((m?: string) => String(m) === "Even").length,
                message: "Even"
            }
        }
    }
  }
  