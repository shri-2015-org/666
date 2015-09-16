import { assert, expect, should } from 'chai';
should(); // actually call the function

// example
describe('Client examples (/client/js/example.test.js)', () => {
  describe('Strings', () => {
    const foo = 'bar';

    it('Foo is string, is bar, length is 3', () => {
      assert.typeOf(foo, 'string');
      assert.typeOf(foo, 'string', 'foo is a string');
      assert.equal(foo, 'bar', 'foo equal `bar`');
      assert.lengthOf(foo, 3, 'foo`s value has a length of 3');

      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.length(3);

      foo.should.be.a('string');
      foo.should.equal('bar');
      foo.should.have.length(3);
    });
  });

  describe('Object and Array', () => {
    const beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

    it('Tea is in beverages and it length is 3', () => {
      assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
      expect(beverages).to.have.property('tea').with.length(3);
      beverages.should.have.property('tea').with.length(3);
    });

    it('should return -1 when the value is not present', () => {
      beverages.tea.indexOf('fruit').should.equal(-1);
      beverages.tea.indexOf(0).should.equal(-1);
    });

    it('should return 1 when the value is `matcha`', () => {
      beverages.tea.indexOf('matcha').should.equal(1);
    });
  });
});

