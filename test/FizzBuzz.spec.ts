import { expect } from 'chai';
import { Container } from 'typescript-ioc';
import FizzBuzz from '../src/service/FizzBuzz';

describe('FizzBuzz', () => {
  let sut: FizzBuzz;

  before(() => {
    sut = Container.get(FizzBuzz);
  });

  it('should correctly compute FizzBuzz results', () => {
    const result = sut.Play(15);

    expect(result).to.deep.equal({
      Fizz: { count: 4, message: 'Fizz' },
      Buzz: { count: 2, message: 'Buzz' },
      FizzBuzz: { count: 1, message: 'FizzBuzz' },
    });
  });

  it('should use custom messages if provided', () => {
    const customMessages = { Fizz: 'CustomFizz', Buzz: 'CustomBuzz', FizzBuzz: 'CustomFizzBuzz' };
    const result = sut.Play(15, customMessages);

    expect(result).to.deep.equal({
      Fizz: { count: 4, message: 'CustomFizz' },
      Buzz: { count: 2, message: 'CustomBuzz' },
      FizzBuzz: { count: 1, message: 'CustomFizzBuzz' },
    });
  });
});
