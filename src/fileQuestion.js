const fs = require('fs');
const {readBook,getQuestion} = require('./readPDF');

class FileQuestion{
  async readFile(path){
    const data = fs.readFileSync(path, "utf8");
    try {
      const fileText = data.split('\n');
      var questions = []
      for (let i=0;i<fileText.length;i++){
        if(fileText[i]===''){
          return;
        }
        if(fileText[i].indexOf('Pagina ')!==-1){
          const pageNumber = parseInt(fileText[i].replace('Pagina ',''));
          
          const page_text = await readBook(pageNumber, 'feltre2');

          const questionsNumbersAUX = fileText[i+1].split(',');
          const questionsNumbers = questionsNumbersAUX.map(number=>parseInt(number));
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
  getQuestions(questions){
    return questions;
  }
}

module.exports = new FileQuestion();