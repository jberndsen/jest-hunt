const add = require('./calc');

test('calc - add', () => {
    // ARRANGE
    const expected = 2;

    // ACT
    const actual = add(1, 1);

    // ASSERT
    expect(actual).toBe(expected);
})
