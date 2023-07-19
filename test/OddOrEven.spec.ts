import { expect } from 'chai';
import { Container } from 'typescript-ioc';
import OddOrEven from '../src/service/OddOrEven';

describe('OddOrEven', () => {
  let sut: OddOrEven;

  before(() => {
    sut = Container.get(OddOrEven);
  });

  it('should correctly compute OddOrEven results', () => {
    const result = sut.Play(10);

    expect(result).to.deep.equal({
      Odd: { count: 5, message: 'Odd' },
      Even: { count: 5, message: 'Even' },
    });
  });
});
