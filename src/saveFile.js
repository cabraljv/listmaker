const fs = require('fs');

class SaveFile{

  //Formata o texto da questão para ser salvo no pdf
  formatAwnser(question,awnser){
    const formatedAwnser = `${question.index}- ${question.question}\n\n${awnser.thanksCount} Obrigados\n ${awnser.content}\n\n\n`
    return formatedAwnser;
  }
}

module.exports = new SaveFile();