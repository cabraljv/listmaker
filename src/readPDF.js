const fs = require('fs');
const pdf = require('pdf-parse');
 
// Lê uma determinada página do livro escolhido
async function readBook(page,book_name){
  let dataBuffer;
  if(book_name==='feltre2'){
    // Recupera arquivo de pdf estático
    dataBuffer = fs.readFileSync('./assets/books/feltre2.pdf');
  }
  
  //Recupera a parte do livro da página 0 até a "page"
  const firstText = await pdf(dataBuffer, {max:page});

  //Recupera a parte do livro da página 0 até a "page-1"
  const outerText = await pdf(dataBuffer, {max:page-1});

  // O texto da determinada página se dá pelo firstText - outerText
  const text = firstText.text.replace(outerText.text,'');

  return text;

}
function getQuestion(number, page_text){

  // Transforma o texto em um array de linhas
  const text = page_text.split('\n');

  for (let i=0;i<text.length;i++){

    /*
     Caso encontre uma linha cujos primeiros caracteres sejam o número 
     da determinada questão e possua mais de 3 caracteres quer dizer que
     o laço achou aquela questão
    */
    if(text[i].indexOf(number)===0 && text[i].length>3){

      const index = number;

      // Remove o número do começo da linha
      // Uma questão e composta pela linha encontrada e as duas linhas seguintes
      const question = text[i].replace(number,'') + ' ' + text[i+1]+ ' ' + text[i+2]; 
      return {index,question};
    }
  }
}


module.exports = {getQuestion,readBook};



