const {expect} = require('chai');
const {books, createBookDataTableString} = require('../strings-exercise-1.js');

describe("Test Output String ex.1 ", function() {

  it("String is gud", function() {
  // Arrange
    const expectedOutput = `| Pub Date    |                         Title | Authors               |
|=====================================================================|
| 29 Jul 1954 |             Lord of the Rings | John Ronald Reuel ... |
| 01 Aug 1996 |             A Game of Thrones | George Raymond Martin |
| 21 Jun 2003 | Harry Potter and the Order... |        Joanne Rowling |
`
  //Act
    const generatedOutput = createBookDataTableString(books);
  //Assert
    expect(generatedOutput).to.equal(expectedOutput);
  });
});
