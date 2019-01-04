const parse = require('csv-parse/lib/sync')
const widthColumn = {'Publication Date':13, Title:31, Authors:23};

let csv = `Publication Date,Title,Authors
29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien
01/08/1996,A Game of Thrones,George Raymond Martin
21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling`

const books = parse(csv, {
  columns: true,
})

function formatDate(dateString){
  let day = dateString.slice(0,2),
      month = dateString.slice(3,5),
      year = dateString.slice(6,10),
      date = new Date(year, month-1, day)
      let monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  formattedDateString = `${('0'+ date.getDate()).slice(-2)} ${monthString[date.getMonth()]} ${date.getFullYear()} `
  return formattedDateString;
}

function padTextAlignLeft(string, desiredLength){
  string = string.trim();
  string = ` ${string} `
  while (string.length < desiredLength){
    string += ' '
  }
  return string
}

function padTextAlignRight(string, desiredLength){
  string = string.trim();
  string = ` ${string} `
  while (string.length < desiredLength){
    string = ' '+string
  }
  return string
}

function isStringTooLong(string, desiredLength){
  if (string.length >= desiredLength){
    return true;
  } else {
    return false;
  }
}

function truncateLongString(string, desiredLength){
  //string needs to be 2 less than desiredLength to add spaces on either side, plus need a further -2 for adding '...'
  let maxStringLength = desiredLength - 2 - 2
  string = string.slice(0, maxStringLength-1)+'...';
  return string;
}

function makeHorizontalDivider(columnHeader){
  let tableWidth = columnHeader.length;
  let horizontalDivider = '|';
  for (let i = 1; i <= tableWidth-2; i++){ //-2 to account for the | characters at start and end
    horizontalDivider += '='
  }
  horizontalDivider += '|';
  return horizontalDivider;
}

function makeRowString(book){

  for (let property in book){
    if (isStringTooLong(book[property], widthColumn[property])){
      book[property] = truncateLongString(book[property], widthColumn[property])
    }
  }

  let pubDateString = formatDate(book['Publication Date']),
      titleString = book.Title,
      authorString = book.Authors;

  pubDateString = padTextAlignRight(pubDateString, widthColumn['Publication Date'])
  titleString = padTextAlignRight(titleString, widthColumn.Title)
  authorString = padTextAlignRight(authorString, widthColumn.Authors)

  return `|${pubDateString}|${titleString}|${authorString}|`;
}

function createBookDataTableString(books){
  let output =''
  let columnHeader= `|${padTextAlignLeft('Pub Date', widthColumn['Publication Date'])}|${padTextAlignRight('Title', widthColumn.Title)}|${padTextAlignLeft('Authors', widthColumn.Authors)}|`

  output += `${columnHeader}\n${makeHorizontalDivider(columnHeader)}\n`

  books.forEach(book =>{
    output += `${makeRowString(book)}\n`
  })
  return output
}

console.log(createBookDataTableString(books));

module.exports = {
  books,
  createBookDataTableString
}
