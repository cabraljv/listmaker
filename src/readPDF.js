const fs = require('fs');
const pdf = require('pdf-parse');
 

async function readBook(page,book_name){
  let dataBuffer;
  if(book_name==='feltre2'){
    dataBuffer = fs.readFileSync('./assets/books/feltre2.pdf');
  }
  const firstText = await pdf(dataBuffer, {max:page});

  const outerText = await pdf(dataBuffer, {max:page-1});

  const text = firstText.text.replace(outerText.text,'');

  return text;

}
function getQuestion(number, page_text){
  const text = page_text.split('\n');
  for (let i=0;i<text.length;i++){
    if(text[i].indexOf(number)===0 && text[i].length>3){
      const index = number;
      const question = text[i].replace(number,'') + ' ' + text[i+1]+ ' ' + text[i+2]; 
      return {index,question};
    }
  }
}


module.exports = {getQuestion,readBook};



