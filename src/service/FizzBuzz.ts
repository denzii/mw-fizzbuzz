import { InRequestScope } from "typescript-ioc";
import IGame from "../interface/Game";
import { FizzBuzzResult } from "../interface/GameResult";

@InRequestScope
export default class FizzBuzz implements IGame<FizzBuzzResult> {
    Play(n: number, targetMessages: { Fizz: string, Buzz: string, FizzBuzz: string } | undefined = {
        Fizz: "Fizz",
        Buzz: "Buzz",
        FizzBuzz: "FizzBuzz"
    }): FizzBuzzResult {
        // 1. declare an array from 1 to n
        // 2. map each declaration to the given message
        // 3. count the occurrences of each message
        const mappedStrings = Array.from({ length: n }, (_, index) => index + 1)
            .map((num: number) => {
                if (num % 3 === 0 && num % 5 === 0) {
                    return targetMessages.FizzBuzz;
                }
                if (num % 3 === 0) {
                    return targetMessages.Fizz;
                }
                
                return (num % 5 === 0) 
                    ? targetMessages.Buzz 
                    : num.toString();
            });

        return {
            Fizz: {
                count: mappedStrings.filter((m?: string) => String(m) === targetMessages.Fizz).length,
                message: targetMessages.Fizz
            },
            Buzz: {
                count: mappedStrings.filter((m?: string) => String(m) === targetMessages.Buzz).length,
                message: targetMessages.Buzz
            },
            FizzBuzz: {
                count: mappedStrings.filter((m?: string) => String(m) === targetMessages.FizzBuzz).length,
                message: targetMessages.FizzBuzz
            }
        };
    }
}
