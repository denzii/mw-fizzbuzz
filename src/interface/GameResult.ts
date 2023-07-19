type GameResult<T extends string> = {
    [key in T]: { count: number; message: string };
};

type OddOrEvenResult = GameResult<'Odd' | 'Even'>;
type FizzBuzzResult = GameResult<'Fizz' | 'Buzz' | 'FizzBuzz'>;

export default GameResult;
export { OddOrEvenResult, FizzBuzzResult };