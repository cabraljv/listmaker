const fs = require('fs');
const {readBook,getQuestion} = require('./readPDF');

class FileQuestion{

  //  Método responsável por ler o arquivo com as páginas e números das questões
  async readFile(path){
    const data = fs.readFileSync(path, "utf8");
    try {
      const fileText = data.split('\n');

      var questions = []; // Array com as questões encontradas

      for (let i=0;i<fileText.length;i++){ // Percorrendo o arquivo com as questões

        if(fileText[i]===''){ // Se a linha for vazia passa pra próxima
          return;
        }

        //Caso seja encontrada a uma requisição de página com questões
        if(fileText[i].indexOf('Pagina ')!==-1){ 

          //Recupera número da página do texto
          const pageNumber = parseInt(fileText[i].replace('Pagina ','')); 
          
          // Recupera todo o texto da determinada página no pdf do feltre 2
          const page_text = await readBook(pageNumber, 'feltre2');

          //Recuperra um array com o número de cada questão
          const questionsNumbersAUX = fileText[i+1].split(',');
          const questionsNumbers = questionsNumbersAUX.map(number=>parseInt(number));

          //Percorre o array de questões buscando cada uma no texto recuperado daquela determinada página
          for (let j=0;j<questionsNumbers.length;j++){
            questions.push(getQuestion(questionsNumbers[j],page_text));
          }
        }
      }
      return questions;
    } catch (error) {
      //console.log('deu merda')
      return error;
    }      
  }
}

module.exports = new FileQuestion();